import { io } from 'socket.io-client';

export class SignalingService {
  constructor() {
    this.socket = null;
    this.callbacks = {
      onRoomJoined: null,
      onUserJoined: null,
      onUserLeft: null,
      onOffer: null,
      onAnswer: null,
      onIceCandidate: null,
      onGroupMessage: null,
      onPrivateMessage: null
    };
  }

  connect(serverUrl = 'http://localhost:5000') {
    return new Promise((resolve, reject) => {
      try {
        this.socket = io(serverUrl);
        
        this.socket.on('connect', () => {
          console.log('Connected to signaling server');
          this.setupEventListeners();
          resolve(this.socket.id);
        });

        this.socket.on('connect_error', (error) => {
          console.error('Connection error:', error);
          reject(error);
        });
      } catch (error) {
        console.error('Failed to connect to signaling server:', error);
        reject(error);
      }
    });
  }

  setupEventListeners() {
    this.socket.on('room-joined', (data) => {
      if (this.callbacks.onRoomJoined) {
        this.callbacks.onRoomJoined(data);
      }
    });

    this.socket.on('user-joined', (data) => {
      if (this.callbacks.onUserJoined) {
        this.callbacks.onUserJoined(data);
      }
    });

    this.socket.on('user-left', (data) => {
      if (this.callbacks.onUserLeft) {
        this.callbacks.onUserLeft(data);
      }
    });

    this.socket.on('offer', (data) => {
      if (this.callbacks.onOffer) {
        this.callbacks.onOffer(data);
      }
    });

    this.socket.on('answer', (data) => {
      if (this.callbacks.onAnswer) {
        this.callbacks.onAnswer(data);
      }
    });

    this.socket.on('ice-candidate', (data) => {
      if (this.callbacks.onIceCandidate) {
        this.callbacks.onIceCandidate(data);
      }
    });

    this.socket.on('group-message', (data) => {
      if (this.callbacks.onGroupMessage) {
        this.callbacks.onGroupMessage(data);
      }
    });

    this.socket.on('private-message', (data) => {
      if (this.callbacks.onPrivateMessage) {
        this.callbacks.onPrivateMessage(data);
      }
    });
  }

  joinRoom(roomId, username) {
    this.socket.emit('join-room', { roomId, username });
  }

  sendOffer(target, offer) {
    this.socket.emit('offer', { target, offer });
  }

  sendAnswer(target, answer) {
    this.socket.emit('answer', { target, answer });
  }

  sendIceCandidate(target, candidate) {
    this.socket.emit('ice-candidate', { target, candidate });
  }

  sendGroupMessage(roomId, message) {
    this.socket.emit('group-message', { roomId, message });
  }

  sendPrivateMessage(target, message) {
    this.socket.emit('private-message', { target, message });
  }

  setCallbacks(callbacks) {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  getSocketId() {
    return this.socket ? this.socket.id : null;
  }
}