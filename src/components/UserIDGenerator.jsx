// components/UserIDGenerator.jsx
import { useState, useEffect } from 'react';
import { Copy, RefreshCw, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import ConnectionRequestDialog from './ConnectionRequestDialog';
import getWebRTCService from '@/lib/webrtcService';

const UserIDGenerator = ({ onConnect }) => {
  const [userId, setUserId] = useState('');
  const [friendId, setFriendId] = useState('');
  const [copied, setCopied] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');
  const [connectionRequest, setConnectionRequest] = useState(null);
  const [requestResponse, setRequestResponse] = useState(null);

  // Generate a random user ID on component mount
  useEffect(() => {
    generateUserId();
    
    // Cleanup function to ensure WebRTC service is properly disconnected
    return () => {
      const webrtcService = getWebRTCService();
      if (webrtcService) {
        webrtcService.disconnect();
      }
    };
  }, []);

  // Set up event handlers for WebRTC service
  useEffect(() => {
    const webrtcService = getWebRTCService();
    
    // Handle incoming connection requests
    webrtcService.onConnectionRequest((fromUserId) => {
      setConnectionRequest(fromUserId);
    });
    
    // Handle connection responses
    webrtcService.onConnectionResponse((response) => {
      setRequestResponse(response);
      setIsConnecting(false);
      
      if (response.accepted) {
        console.log('Connection request accepted');
        // Initiate WebRTC peer connection
        webrtcService.initiatePeerConnection(response.fromUserId);
      } else {
        setError('Connection request declined');
      }
    });
    
    // Handle connection established
    webrtcService.onConnected(() => {
      console.log('Connection established');
      setIsConnecting(false);
      onConnect(userId, webrtcService.recipientId);
    });
    
    // Handle connection errors or disconnection
    webrtcService.onDisconnected((err) => {
      console.error('Connection failed or disconnected:', err);
      setIsConnecting(false);
      setError(err ? `Connection error: ${err.message}` : 'Connection failed. Please try again.');
    });
  }, [userId, onConnect]);

  // Generate a random user ID
  const generateUserId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 12; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setUserId(result);
  };

  // Copy user ID to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(userId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle connection request
  const handleConnect = async () => {
    if (!userId || !friendId) {
      setError('Both your ID and friend\'s ID are required');
      return;
    }
    
    if (userId === friendId) {
      setError('You cannot connect to yourself');
      return;
    }
    
    setIsConnecting(true);
    setError('');

    try {
      const webrtcService = getWebRTCService();
      
      // First, make sure any existing connections are closed
      webrtcService.disconnect();
      
      // Connect to the signaling server
      await webrtcService.connect(userId);
      
      // Send connection request
      webrtcService.sendConnectionRequest(friendId);
      
      // Set a timeout for connection responses
      setTimeout(() => {
        if (isConnecting && !requestResponse) {
          setIsConnecting(false);
          setError('Connection request timed out. The user may be offline.');
        }
      }, 30000); // 30 seconds timeout
    } catch (err) {
      console.error('Error establishing connection:', err);
      setIsConnecting(false);
      setError(`Connection error: ${err.message}`);
    }
  };

  // Handle accepting a connection request
  const handleAcceptRequest = async () => {
    try {
      const webrtcService = getWebRTCService();
      
      // Don't disconnect if already connected to signaling server
      // Only disconnect peer connection if it exists
      if (webrtcService.peer) {
        webrtcService.destroy(); // Just destroy the peer, not the entire connection
      }
      
      // Connect to the signaling server if not already connected
      if (!webrtcService.socket || !webrtcService.socket.connected) {
        await webrtcService.connect(userId);
      }
      
      // Accept the connection request
      webrtcService.respondToConnectionRequest(connectionRequest, true);
      
      // Clear the connection request
      setConnectionRequest(null);
      
      // Notify parent component to switch to chat window
      onConnect(userId, connectionRequest, false);
    } catch (err) {
      console.error('Error accepting connection:', err);
      setError(`Error accepting connection: ${err.message}`);
    }
  };
  

  // Handle declining a connection request
  const handleDeclineRequest = async () => {
    try {
      const webrtcService = getWebRTCService();
      
      // First, make sure any existing connections are closed
      webrtcService.disconnect();
      
      // Connect to the signaling server if not already connected
      if (!webrtcService.socket || !webrtcService.socket.connected) {
        await webrtcService.connect(userId);
      }
      
      // Decline the connection request
      webrtcService.respondToConnectionRequest(connectionRequest, false);
      
      // Clear the connection request
      setConnectionRequest(null);
    } catch (err) {
      console.error('Error declining connection:', err);
      setError(`Error declining connection: ${err.message}`);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Your ID</CardTitle>
            <CardDescription className="text-slate-300">
              Share this ID with your friend to connect
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Input
                value={userId}
                readOnly
                className="bg-slate-900 border-slate-700 text-white"
              />
              <Button 
                onClick={copyToClipboard} 
                variant="outline" 
                size="icon" 
                className="border-slate-700 hover:bg-slate-700 text-slate-300"
              >
                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button 
                onClick={generateUserId} 
                variant="outline" 
                size="icon"
                className="border-slate-700 hover:bg-slate-700 text-slate-300"
                disabled={isConnecting}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Friend's ID</CardTitle>
            <CardDescription className="text-slate-300">
              Enter your friend's ID to connect
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                value={friendId}
                onChange={(e) => setFriendId(e.target.value)}
                placeholder="Enter your friend's ID"
                className="bg-slate-900 border-slate-700 text-white"
                disabled={isConnecting}
              />
              <Button 
                onClick={handleConnect}
                disabled={!friendId || isConnecting}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isConnecting ? "Waiting for response..." : "Request Connection"}
              </Button>
              
              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}
              
              {requestResponse && !requestResponse.accepted && (
                <div className="text-yellow-500 text-sm mt-2">
                  Connection request was declined by the recipient.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {connectionRequest && (
        <ConnectionRequestDialog 
          fromUserId={connectionRequest}
          onAccept={handleAcceptRequest}
          onDecline={handleDeclineRequest}
        />
      )}
    </>
  );
};

export default UserIDGenerator;