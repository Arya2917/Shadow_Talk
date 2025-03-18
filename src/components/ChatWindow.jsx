// components/ChatWindow.jsx
import { useState, useRef, useEffect } from 'react';
import { Send, PlusCircle, ArrowLeft, Shield, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import getWebRTCService from '@/lib/webrtcService';

const ChatWindow = ({ userId, friendId, onDisconnect, isInitiator = false }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('connecting'); // 'connecting', 'connected', 'disconnected'
  const [fileToSend, setFileToSend] = useState(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const webrtcService = useRef(null);

  // Initialize WebRTC connection
  useEffect(() => {
    const initializeWebRTC = async () => {
      try {
        webrtcService.current = getWebRTCService();
        
        // Important: Don't reconnect if already connected
        if (!webrtcService.current.socket || !webrtcService.current.socket.connected) {
          await webrtcService.current.connect(userId);
        }
        
        // Set up event handlers
        webrtcService.current.onMessage((message) => {
          setMessages(prevMessages => [...prevMessages, {
            id: prevMessages.length + 1,
            sender: message.sender,
            content: message.content,
            type: message.type,
            fileData: message.fileData,
            fileName: message.fileName,
            timestamp: new Date(message.timestamp)
          }]);
        });
        
        webrtcService.current.onConnected(() => {
          setConnectionStatus('connected');
          setMessages(prevMessages => [
            ...prevMessages,
            {
              id: prevMessages.length + 1,
              sender: 'system',
              content: 'Connected securely. This conversation is end-to-end encrypted.',
              type: 'text',
              timestamp: new Date()
            }
          ]);
        });
        
        webrtcService.current.onDisconnected((err) => {
          setConnectionStatus('disconnected');
          setMessages(prevMessages => [
            ...prevMessages,
            {
              id: prevMessages.length + 1,
              sender: 'system',
              content: err ? `Connection error: ${err.message}. Please try reconnecting.` : 'Connection lost. Please try reconnecting.',
              type: 'text',
              timestamp: new Date()
            }
          ]);
        });
        
        // If this user initiated the connection, start the peer connection
        if (isInitiator) {
          console.log('Initiating peer connection as initiator');
          webrtcService.current.initiatePeerConnection(friendId);
        } else {
          console.log('Waiting for signals as non-initiator');
          // The non-initiator just waits for signals
        }
        
        // Add initial system message
        setMessages([
          {
            id: 1,
            sender: 'system',
            content: 'Establishing secure connection...',
            type: 'text',
            timestamp: new Date()
          }
        ]);
      } catch (error) {
        console.error('WebRTC initialization error:', error);
        setConnectionStatus('disconnected');
        setMessages([
          {
            id: 1,
            sender: 'system',
            content: `Connection error: ${error.message}. Please try again.`,
            type: 'text',
            timestamp: new Date()
          }
        ]);
      }
    };

    initializeWebRTC();

    // No cleanup on unmount to prevent premature disconnection
  }, [userId, friendId, isInitiator]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const checkConnectionStatus = () => {
      if (webrtcService.current && connectionStatus === 'connecting') {
        const state = webrtcService.current.logConnectionState();
        console.log('Connection state check:', state);
        
        // If we've been in connecting state too long, try to reconnect
        if (state.peer && !state.connected && attemptCount < 3) {
          console.log('Attempting to reconnect peer');
          setAttemptCount(prev => prev + 1);
          
          if (isInitiator) {
            webrtcService.current.initiatePeerConnection(friendId);
          }
        }
      }
    };
    
    const intervalId = setInterval(checkConnectionStatus, 5000);
    return () => clearInterval(intervalId);
  }, [connectionStatus, isInitiator, friendId, attemptCount]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() && webrtcService.current && connectionStatus === 'connected') {
      const newMessage = {
        id: messages.length + 1,
        sender: userId,
        content: inputMessage,
        type: 'text',
        timestamp: new Date()
      };
      
      setMessages([...messages, newMessage]);
      webrtcService.current.sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const handleDisconnect = () => {
    if (webrtcService.current) {
      webrtcService.current.disconnect();
    }
    onDisconnect();
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileToSend(e.target.files[0]);
    }
  };

  const sendFile = async () => {
    if (!fileToSend || !webrtcService.current || connectionStatus !== 'connected') return;

    try {
      // Read file as data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileData = e.target.result;
        
        // Send file message
        const newMessage = {
          id: messages.length + 1,
          sender: userId,
          content: `Sent file: ${fileToSend.name}`,
          type: 'file',
          fileName: fileToSend.name,
          fileData,
          timestamp: new Date()
        };
        
        setMessages([...messages, newMessage]);
        webrtcService.current.sendMessage(fileToSend.name, 'file', fileData);
        setFileToSend(null);
      };
      
      reader.readAsDataURL(fileToSend);
    } catch (error) {
      console.error('Error sending file:', error);
    }
  };

  useEffect(() => {
    if (fileToSend) {
      sendFile();
    }
  }, [fileToSend]);

  const downloadFile = (fileData, fileName) => {
    const link = document.createElement('a');
    link.href = fileData;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (webrtcService.current) {
        console.log('Connection state:', webrtcService.current.logConnectionState());
      }
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col h-[80vh] bg-slate-900 border border-slate-700 rounded-lg shadow-lg overflow-hidden">
      {/* Chat header */}
      <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-700">
        <div className="flex items-center gap-3">
          <Button 
            onClick={handleDisconnect}
            variant="ghost" 
            size="icon" 
            className="text-slate-300 hover:bg-slate-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              connectionStatus === 'connected' ? 'bg-green-500' : 
              connectionStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
            <span className="text-white font-medium">Connected to: {friendId.substring(0, 8)}...</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-green-500" />
          <div className="text-slate-400 text-sm">End-to-End Encrypted</div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 p-4 overflow-y-auto bg-slate-900">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex mb-4 ${message.sender === userId ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'system' ? (
              <div className="bg-slate-800 text-slate-300 px-4 py-2 rounded-lg max-w-xs md:max-w-md text-center mx-auto">
                {message.content}
              </div>
            ) : (
              <div className={`flex ${message.sender === userId ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
                <Avatar className="h-8 w-8 bg-slate-700 border border-slate-600" />
                <div className="flex flex-col">
                  <div 
                    className={`px-4 py-2 rounded-lg ${
                      message.sender === userId 
                        ? 'bg-purple-600 text-white rounded-br-none' 
                        : 'bg-slate-700 text-slate-100 rounded-bl-none'
                    }`}
                  >
                    {message.type === 'file' ? (
                      <div className="flex items-center gap-2">
                        <span>{message.content}</span>
                        {message.fileData && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-white hover:bg-purple-700"
                            onClick={() => downloadFile(message.fileData, message.fileName)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ) : (
                      message.content
                    )}
                  </div>
                  <span className="text-xs text-slate-400 mt-1">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <form onSubmit={sendMessage} className="bg-slate-800 px-4 py-3 border-t border-slate-700">
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <Button 
            type="button"
            onClick={handleFileSelect}
            variant="ghost" 
            size="icon" 
            className="text-slate-300 hover:bg-slate-700"
            disabled={connectionStatus !== 'connected'}
          >
            <PlusCircle className="h-5 w-5" />
          </Button>
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="bg-slate-700 border-slate-600 text-white"
            disabled={connectionStatus !== 'connected'}
          />
          <Button 
            type="submit"
            variant="ghost" 
            size="icon" 
            className="text-slate-300 hover:bg-slate-700"
            disabled={!inputMessage.trim() || connectionStatus !== 'connected'}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;