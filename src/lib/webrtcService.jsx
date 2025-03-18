// lib/webrtcService.js
import SimplePeer from 'simple-peer';
import io from 'socket.io-client';
import { encrypt, decrypt } from './cryptoService';

class WebRTCService {
  constructor() {
    this.socket = null;
    this.peer = null;
    this.userId = null;
    this.recipientId = null;
    this.encryptionKey = null;
    this.onMessageCallback = null;
    this.onConnectedCallback = null;
    this.onDisconnectedCallback = null;
    this.onConnectionRequestCallback = null;
    this.onConnectionResponseCallback = null;
    this.isInitiator = false;
    this.connectionTimeout = null;
    this.pendingConnections = new Set(); // Track pending connection requests
  }

  // Connect to signaling server
  connect(userId) {
    return new Promise((resolve, reject) => {
      try {
        this.userId = userId;
        
        const serverUrl = process.env.NEXT_PUBLIC_SIGNALING_SERVER || 'http://localhost:4000';
        console.log(`Connecting to signaling server at: ${serverUrl}`);
        
        this.socket = io(serverUrl, {
          transports: ['websocket'],
          secure: process.env.NODE_ENV === 'production',
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000
        });
          
        this.socket.on('connect', () => {
          console.log('Connected to signaling server with socket ID:', this.socket.id);
          this.socket.emit('register', userId);
        });
        
        this.socket.on('registered', ({ userId }) => {
          console.log('Successfully registered with user ID:', userId);
          resolve();
        });

        this.socket.on('signal', this.handleIncomingSignal.bind(this));
        
        // New: Handle incoming connection requests
        this.socket.on('incoming-connection-request', ({ fromUserId }) => {
          console.log('Received connection request from:', fromUserId);
          if (this.onConnectionRequestCallback) {
            this.onConnectionRequestCallback(fromUserId);
          }
        });
        
        // New: Handle connection responses
        this.socket.on('connection-response', (response) => {
          console.log('Received connection response:', response);
          if (this.onConnectionResponseCallback) {
            this.onConnectionResponseCallback(response);
          }
        });
        
        this.socket.on('error', (error) => {
          console.error('Socket error:', error);
          if (this.onDisconnectedCallback) {
            this.onDisconnectedCallback(error);
          }
        });
        
        this.socket.on('connect_error', (err) => {
          console.error('Socket connection error:', err);
          reject(err);
        });
      } catch (err) {
        console.error('Error connecting to signaling server:', err);
        reject(err);
      }
    });
  }

  // New: Send connection request to a recipient
  sendConnectionRequest(recipientId) {
    if (!this.socket || !this.socket.connected) {
      console.error('Socket not connected');
      return false;
    }
    
    this.recipientId = recipientId;
    this.pendingConnections.add(recipientId);
    
    this.socket.emit('connection-request', {
      fromUserId: this.userId,
      toUserId: recipientId
    });
    
    return true;
  }
  
  // New: Respond to connection request
  respondToConnectionRequest(fromUserId, accepted) {
    if (!this.socket || !this.socket.connected) {
      console.error('Socket not connected');
      return false;
    }
    
    this.socket.emit('connection-response', {
      fromUserId: this.userId,
      toUserId: fromUserId,
      accepted
    });
    
    if (accepted) {
      this.recipientId = fromUserId;
      // If we accept, we become the non-initiator peer
      this.isInitiator = false;
    }
    
    return true;
  }

  // Initialize peer connection as initiator
  initiatePeerConnection(recipientId) {
    console.log(`Initiating peer connection with ${recipientId}`);
    
    // Clean up any existing peer
    if (this.peer) {
      this.peer.destroy();
      this.peer = null;
    }
    
    this.isInitiator = true;
    this.recipientId = recipientId;
    
    // Generate an encryption key for e2e encryption
    this.encryptionKey = this.generateEncryptionKey();
    
    // Create a peer connection with debug info
    this.peer = new SimplePeer({
      initiator: true,
      trickle: false,
      debug: true
    });

    this.setupPeerEvents();
    
    // Set a timeout for the connection
    this.connectionTimeout = setTimeout(() => {
      if (this.peer && !this.peer.connected) {
        console.log('Connection timeout');
        if (this.onDisconnectedCallback) {
          this.onDisconnectedCallback(new Error('Connection timeout'));
        }
      }
    }, 30000); // 30 seconds timeout
  }

  // Handle incoming signal data
// In webrtcService.jsx
handleIncomingSignal({ userId, signal }) {
  try {
    console.log('Received signal from:', userId);
    
    if (!this.peer && !this.isInitiator) {
      // If we're not the initiator and don't have a peer yet, create one
      console.log('Creating non-initiator peer');
      this.recipientId = userId;
      
      this.peer = new SimplePeer({
        initiator: false,
        trickle: false,
        debug: true
      });
      
      this.setupPeerEvents();
      
      // Add a slight delay before processing the signal
      setTimeout(() => {
        if (this.peer) {
          console.log('Processing delayed signal data', signal);
          this.peer.signal(signal);
        }
      }, 100);
      
      return; // Important: return here to avoid processing the signal immediately
    }
    
    // Handle the signal data
    if (this.peer) {
      console.log('Processing signal data', signal);
      this.peer.signal(signal);
    } else {
      console.error('No peer available to process signal');
    }
  } catch (err) {
    console.error('Error processing signal:', err);
  }
}

  // Setup peer connection events
  setupPeerEvents() {
    this.peer.on('signal', (data) => {
      console.log('Generated signal data, sending to recipient', this.recipientId);
      
      // Send signal data through signaling server
      if (this.socket && this.socket.connected) {
        this.socket.emit('signal', {
          userId: this.userId,
          recipientId: this.recipientId,
          signal: data
        });
      } else {
        console.error('Socket not connected, cannot send signal');
      }
    });

    this.peer.on('connect', () => {
      console.log('Peer connection established');
      
      // Clear connection timeout
      if (this.connectionTimeout) {
        clearTimeout(this.connectionTimeout);
        this.connectionTimeout = null;
      }
      
      // Remove from pending connections
      this.pendingConnections.delete(this.recipientId);
      
      // If we're the initiator, send the encryption key
      if (this.isInitiator && this.encryptionKey) {
        console.log('Sending encryption key');
        this.peer.send(JSON.stringify({
          type: 'encryption-key',
          key: this.encryptionKey
        }));
      }
      
      if (this.onConnectedCallback) {
        this.onConnectedCallback();
      }
    });

    this.peer.on('data', (data) => {
      try {
        const message = JSON.parse(data);
        
        // Handle encryption key
        if (message.type === 'encryption-key') {
          console.log('Received encryption key');
          this.encryptionKey = message.key;
          return;
        }
        
        // Decrypt incoming message if we have an encryption key
        if (this.encryptionKey && message.encrypted) {
          message.content = decrypt(message.content, this.encryptionKey);
        }
        
        if (this.onMessageCallback) {
          this.onMessageCallback(message);
        }
      } catch (err) {
        console.error('Error processing received data:', err);
      }
    });

    this.peer.on('close', () => {
      console.log('Peer connection closed');
      
      // Clear connection timeout
      if (this.connectionTimeout) {
        clearTimeout(this.connectionTimeout);
        this.connectionTimeout = null;
      }
      
      this.destroy();
      
      if (this.onDisconnectedCallback) {
        this.onDisconnectedCallback();
      }
    });

    this.peer.on('error', (err) => {
      // Convert null/undefined errors to an actual Error object
      const peerError = err || new Error('Unknown WebRTC error');
      console.error('Peer connection error:', peerError);
      
      // Clear connection timeout
      if (this.connectionTimeout) {
        clearTimeout(this.connectionTimeout);
        this.connectionTimeout = null;
      }
      
      this.destroy();
      
      if (this.onDisconnectedCallback) {
        this.onDisconnectedCallback(peerError);
      }
    });
  }

  // Send message to peer
  sendMessage(content, type = 'text', fileData = null) {
    if (!this.peer || !this.peer.connected) {
      console.error('Peer not connected');
      return false;
    }

    try {
      // Encrypt message if we have an encryption key
      const encryptedContent = this.encryptionKey ? 
        encrypt(content, this.encryptionKey) : content;
      
      const message = {
        sender: this.userId,
        timestamp: new Date().toISOString(),
        type,
        content: encryptedContent,
        encrypted: !!this.encryptionKey,
        fileData: fileData
      };
      
      this.peer.send(JSON.stringify(message));
      return true;
    } catch (err) {
      console.error('Error sending message:', err);
      return false;
    }
  }

  // Set callback for incoming messages
  onMessage(callback) {
    this.onMessageCallback = callback;
  }

  // Set callback for connected event
  onConnected(callback) {
    this.onConnectedCallback = callback;
  }

  // Set callback for disconnected event
  onDisconnected(callback) {
    // Wrap the original callback to handle undefined error cases
    this.onDisconnectedCallback = (err) => {
      try {
        callback(err); // Original callback might expect err to be defined
      } catch (callbackError) {
        console.error('Error in disconnect callback:', callbackError);
        // Fallback error handling
        callback(new Error('Connection lost with unknown reason'));
      }
    };
  }
  
  // New: Set callback for connection request
  onConnectionRequest(callback) {
    this.onConnectionRequestCallback = callback;
  }
  
  // New: Set callback for connection response
  onConnectionResponse(callback) {
    this.onConnectionResponseCallback = callback;
  }

  // Generate a random encryption key
  generateEncryptionKey() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < 32; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
  }

  // Cleanup resources
  destroy() {
    if (this.peer) {
      this.peer.destroy();
      this.peer = null;
    }
    
    // Clear connection timeout
    if (this.connectionTimeout) {
      clearTimeout(this.connectionTimeout);
      this.connectionTimeout = null;
    }
    
    this.isInitiator = false;
    this.encryptionKey = null;
    this.pendingConnections.clear();
  }

  logConnectionState() {
    if (!this.peer) return 'No peer connection';
    
    return {
      connected: this.peer.connected,
      destroyed: this.peer.destroyed,
      initiator: this.isInitiator,
      userId: this.userId,
      recipientId: this.recipientId,
      hasEncryptionKey: !!this.encryptionKey,
      socketConnected: this.socket && this.socket.connected
    };
  }

  // Disconnect completely
  disconnect() {
    this.destroy();
    
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    
    this.userId = null;
    this.recipientId = null;
  }
}



// Export as singleton
let instance = null;

export default function getWebRTCService() {
  if (!instance) {
    instance = new WebRTCService();
  }
  return instance;
}
