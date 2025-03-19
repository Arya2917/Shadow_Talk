export class WebRTCPeer {
    constructor(socketId, username, signalingService) {
      this.socketId = socketId;
      this.username = username;
      this.signalingService = signalingService;
      this.connection = null;
      this.dataChannel = null;
      this.onMessageCallback = null;
      
      this.initConnection();
    }
  
    initConnection() {
      const configuration = {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' }
        ]
      };
  
      this.connection = new RTCPeerConnection(configuration);
  
      // Setup ICE handling
      this.connection.onicecandidate = (event) => {
        if (event.candidate && this.signalingService) {
          try {
            this.signalingService.sendIceCandidate(this.socketId, event.candidate);
          } catch (err) {
            console.warn('Error sending ICE candidate:', err);
          }
        }
      };
  
      // Create data channel
      this.dataChannel = this.connection.createDataChannel('chat', {
        ordered: true
      });
  
      this.setupDataChannel();
  
      // Handle data channels that are created by the remote peer
      this.connection.ondatachannel = (event) => {
        this.dataChannel = event.channel;
        this.setupDataChannel();
      };
    }
  
    setupDataChannel() {
      this.dataChannel.onopen = () => {
        console.log(`Data channel with ${this.username} opened`);
      };
  
      this.dataChannel.onclose = () => {
        console.log(`Data channel with ${this.username} closed`);
      };
  
      this.dataChannel.onmessage = (event) => {
        if (this.onMessageCallback) {
          const message = JSON.parse(event.data);
          this.onMessageCallback(message);
        }
      };
    }
  
    async createOffer() {
      try {
        if (!this.connection) {
          console.error('Cannot create offer: RTCPeerConnection is null');
          return;
        }
        
        const offer = await this.connection.createOffer();
        await this.connection.setLocalDescription(offer);
        
        if (this.signalingService) {
          this.signalingService.sendOffer(this.socketId, offer);
        } else {
          console.error('Cannot send offer: signaling service is null');
        }
      } catch (error) {
        console.error('Error creating offer:', error);
      }
    }
  
    async handleOffer(offer) {
      try {
        await this.connection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await this.connection.createAnswer();
        await this.connection.setLocalDescription(answer);
        this.signalingService.sendAnswer(this.socketId, answer);
      } catch (error) {
        console.error('Error handling offer:', error);
      }
    }
  
    async handleAnswer(answer) {
      try {
        await this.connection.setRemoteDescription(new RTCSessionDescription(answer));
      } catch (error) {
        console.error('Error handling answer:', error);
      }
    }
  
    handleIceCandidate(candidate) {
      try {
        this.connection.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (error) {
        console.error('Error adding ICE candidate:', error);
      }
    }
  
    sendMessage(message) {
      if (this.dataChannel && this.dataChannel.readyState === 'open') {
        this.dataChannel.send(JSON.stringify(message));
        return true;
      }
      return false;
    }
  
    setOnMessageCallback(callback) {
      this.onMessageCallback = callback;
    }
  
    close() {
      try {
        if (this.dataChannel) {
          this.dataChannel.close();
          this.dataChannel = null;
        }
        if (this.connection) {
          this.connection.close();
          this.connection = null;
        }
      } catch (err) {
        console.error('Error closing peer connection:', err);
      }
    }
  }