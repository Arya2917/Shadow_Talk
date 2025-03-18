// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // In production, set to your frontend URL
  methods: ['GET', 'POST']
}));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || '*', // In production, set to your frontend URL
    methods: ['GET', 'POST']
  }
});

// Store active users
const users = {};

// Basic route for health check
app.get('/', (req, res) => {
  res.send('Shadow Talk Signaling Server is running!');
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  // Handle user registration
  socket.on('register', (userId) => {
    console.log(`User registered: ${userId}`);
    
    // Store the user ID and socket ID mapping
    users[userId] = socket.id;
    socket.userId = userId;
    
    // Confirm registration to client
    socket.emit('registered', { userId });
  });

  // New: Handle connection requests
  socket.on('connection-request', ({ fromUserId, toUserId }) => {
    console.log(`Connection request from ${fromUserId} to ${toUserId}`);
    const targetSocketId = users[toUserId];
    
    if (targetSocketId) {
      io.to(targetSocketId).emit('incoming-connection-request', {
        fromUserId
      });
    } else {
      console.log(`Recipient not found: ${toUserId}`);
      socket.emit('connection-response', { 
        success: false, 
        message: `User ${toUserId} not found or offline` 
      });
    }
  });

  // New: Handle connection responses
  socket.on('connection-response', ({ fromUserId, toUserId, accepted }) => {
    console.log(`Connection ${accepted ? 'accepted' : 'declined'} by ${fromUserId} for ${toUserId}`);
    const targetSocketId = users[toUserId];
    
    if (targetSocketId) {
      io.to(targetSocketId).emit('connection-response', {
        fromUserId,
        accepted
      });
    }
  });

  // Handle signal data
  socket.on('signal', ({ userId, recipientId, signal }) => {
    console.log(`Signal from ${userId} to ${recipientId}`);
    const targetSocketId = users[recipientId];
    
    if (targetSocketId) {
      io.to(targetSocketId).emit('signal', {
        userId,
        signal
      });
    } else {
      console.log(`Recipient not found: ${recipientId}`);
      socket.emit('error', { message: `User ${recipientId} not found or offline` });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    if (socket.userId) {
      delete users[socket.userId];
    }
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Signaling server running on port ${PORT}`);
});

