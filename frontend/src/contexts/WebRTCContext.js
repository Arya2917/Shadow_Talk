import React, { createContext, useContext, useState, useEffect } from 'react';
import { SignalingService } from '../lib/signaling';
import { WebRTCPeer } from '../lib/webrtc';

const WebRTCContext = createContext(null);

export const useWebRTC = () => useContext(WebRTCContext);

export function WebRTCProvider({ children, roomId, username }) {
  const [signalingService, setSignalingService] = useState(null);
  const [connected, setConnected] = useState(false);
  const [socketId, setSocketId] = useState(null);
  const [participants, setParticipants] = useState({});
  const [peers, setPeers] = useState({});
  const [groupMessages, setGroupMessages] = useState([]);
  const [privateMessages, setPrivateMessages] = useState({});
  const [selectedPeer, setSelectedPeer] = useState(null);

  // Initialize the signaling service
  useEffect(() => {
    const signaling = new SignalingService();
    setSignalingService(signaling);

    const init = async () => {
      try {
        const id = await signaling.connect();
        setSocketId(id);
        setConnected(true);
        
        // Setup callback functions
        signaling.setCallbacks({
          onRoomJoined: handleRoomJoined,
          onUserJoined: handleUserJoined,
          onUserLeft: handleUserLeft,
          onOffer: handleOffer,
          onAnswer: handleAnswer,
          onIceCandidate: handleIceCandidate,
          onGroupMessage: handleGroupMessage,
          onPrivateMessage: handlePrivateMessage
        });
        
        // Join the room
        signaling.joinRoom(roomId, username);
      } catch (error) {
        console.error('Failed to initialize WebRTC:', error);
      }
    };

    init();

    // Cleanup on unmount
    return () => {
      // Make a copy of peers to avoid modification during iteration
      const peersToClose = {...peers};
      Object.values(peersToClose).forEach(peer => {
        if (peer) peer.close();
      });
      if (signaling) {
        signaling.disconnect();
      }
      // Clear state
      setPeers({});
      setParticipants({});
    };

    
  }, [roomId, username]);

  // Handle room joined event
  const handleRoomJoined = (data) => {
    const { users } = data;
    setParticipants(users);
    
    // Create peer connections for existing users
    Object.entries(users).forEach(([id, user]) => {
      if (id !== socketId) {
        createPeerConnection(id, user.username);
      }
    });
  };

  // Handle user joined event
  const handleUserJoined = async (data) => {
    const { userId, username } = data;
    
    // Update participants list
    setParticipants(prev => ({
      ...prev,
      [userId]: { id: userId, username }
    }));
    
    // Create peer connection
    const peer = createPeerConnection(userId, username);
    
    // Create and send offer
    if (peer) {
      try {
        await peer.createOffer();
      } catch (err) {
        console.error("Error creating offer:", err);
      }
    } else {
      console.warn(`Could not create peer connection for user ${username} (${userId})`);
    }
  };

  // Handle user left event
  const handleUserLeft = (data) => {
    const { userId } = data;
    
    // Update participants list
    setParticipants(prev => {
      const updated = { ...prev };
      delete updated[userId];
      return updated;
    });
    
    // Close and remove peer connection
    setPeers(prev => {
      const updated = { ...prev };
      if (updated[userId]) {
        // First close the connection, then null out references
        updated[userId].close();
        delete updated[userId];
      }
      return updated;
    });
    
    // If the selected peer left, reset selection
    if (selectedPeer === userId) {
      setSelectedPeer(null);
    }
  };

  // Create a new peer connection
  const createPeerConnection = (peerId, peerUsername) => {

    if (!signalingService) {
      console.error('Signaling service not initialized');
      return null;
    }
    try {
      const peer = new WebRTCPeer(peerId, peerUsername, signalingService);
      
      // Set message callback
      peer.setOnMessageCallback((message) => {
        if (message.type === 'private') {
          handlePrivateMessage({
            from: peerId,
            username: peerUsername,
            message: message.content,
            timestamp: message.timestamp
          });
        }
      });
      
      // Add to peers list
      setPeers(prev => ({
        ...prev,
        [peerId]: peer
      }));
      
      return peer;
    } catch (error) {
      console.error('Error creating peer connection:', error);
      return null;
    }
  
  };

  // WebRTC signaling handlers
  const handleOffer = async (data) => {
    const { from, username, offer } = data;
    let peer = peers[from];
    
    if (!peer) {
      peer = createPeerConnection(from, username);
    }
    
    await peer.handleOffer(offer);
  };

  const handleAnswer = (data) => {
    const { from, answer } = data;
    if (peers[from]) {
      peers[from].handleAnswer(answer);
    }
  };

  const handleIceCandidate = (data) => {
    const { from, candidate } = data;
    if (peers[from]) {
      peers[from].handleIceCandidate(candidate);
    }
  };

  // Message handlers
  const handleGroupMessage = (data) => {
    setGroupMessages(prev => [...prev, data]);
  };

  const handlePrivateMessage = (data) => {
    const { from, to } = data;
    const messageKey = from || to;
    
    setPrivateMessages(prev => ({
      ...prev,
      [messageKey]: [...(prev[messageKey] || []), data]
    }));
  };

  // Send a group message
  const sendGroupMessage = (content) => {
    const message = {
      content,
      sender: username,
      timestamp: Date.now()
    };
    
    signalingService.sendGroupMessage(roomId, content);
    return message;
  };

  // Send a private message
  const sendPrivateMessage = (peerId, content) => {
    const targetPeer = peers[peerId];
    const timestamp = Date.now();
    
    const message = {
      type: 'private',
      content,
      timestamp
    };
    
    // Try to send via WebRTC data channel first
    const sent = targetPeer ? targetPeer.sendMessage(message) : false;
    
    // Fallback to signaling server if WebRTC fails
    if (!sent) {
      signalingService.sendPrivateMessage(peerId, content);
    }
    
    // Add message to local state
    const messageData = {
      from: socketId,
      to: peerId,
      username,
      message: content,
      timestamp
    };
    
    setPrivateMessages(prev => ({
      ...prev,
      [peerId]: [...(prev[peerId] || []), messageData]
    }));
    
    return messageData;
  };

  // Provide context value
  const value = {
    connected,
    socketId,
    participants,
    groupMessages,
    privateMessages,
    selectedPeer,
    setSelectedPeer,
    sendGroupMessage,
    sendPrivateMessage
  };

  return (
    <WebRTCContext.Provider value={value}>
      {children}
    </WebRTCContext.Provider>
  );
}