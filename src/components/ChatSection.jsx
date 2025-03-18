// components/ChatSection.jsx
import { useState, useEffect } from 'react';
import UserIDGenerator from './UserIDGenerator';
import ChatWindow from './ChatWindow';
import getWebRTCService from '@/lib/webrtcService';

const ChatSection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [userId, setUserId] = useState('');
  const [friendId, setFriendId] = useState('');
  const [isInitiator, setIsInitiator] = useState(false);

  // Initialize the WebRTC service when the component mounts
  useEffect(() => {
    // Ensure we have a clean WebRTC service instance
    const webrtcService = getWebRTCService();
    
    // Cleanup on unmount
    return () => {
      if (webrtcService) {
        webrtcService.disconnect();
      }
    };
  }, []);

  const handleConnect = (userId, friendId, initiator = false) => {
    setUserId(userId);
    setFriendId(friendId);
    setIsInitiator(initiator);
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    const webrtcService = getWebRTCService();
    if (webrtcService) {
      webrtcService.disconnect();
    }
    setIsConnected(false);
  };

  return (
    <section className="py-16 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Shadow Talk</h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Connect directly with your friend through our secure, end-to-end encrypted peer-to-peer chat system.
            No messages are stored on any servers - everything stays between you and your peer.
          </p>
        </div>
        
        {isConnected ? (
          <ChatWindow 
            userId={userId} 
            friendId={friendId} 
            onDisconnect={handleDisconnect}
            isInitiator={isInitiator}
          />
        ) : (
          <UserIDGenerator onConnect={handleConnect} />
        )}
      </div>
    </section>
  );
}

export default ChatSection;