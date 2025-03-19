const socketIO = require('socket.io');

function setupSignalingServer(server) {
  const io = socketIO(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  // Keep track of users in rooms
  const rooms = {};

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle joining a room
    socket.on('join-room', ({ roomId, username }) => {
      // Create room if it doesn't exist
      if (!rooms[roomId]) {
        rooms[roomId] = { users: {} };
      }

      // Add user to room
      rooms[roomId].users[socket.id] = { id: socket.id, username };
      
      // Join socket.io room
      socket.join(roomId);
      
      // Send current users list to the new user
      socket.emit('room-joined', {
        roomId,
        users: rooms[roomId].users
      });
      
      // Notify others about new user
      socket.to(roomId).emit('user-joined', {
        userId: socket.id,
        username
      });

      // Store roomId in socket for later use
      socket.roomId = roomId;
      socket.username = username;

      console.log(`${username} joined room: ${roomId}`);
    });

    // Handle WebRTC signaling
    socket.on('offer', ({ target, offer }) => {
      io.to(target).emit('offer', {
        from: socket.id,
        username: socket.username,
        offer
      });
    });

    socket.on('answer', ({ target, answer }) => {
      io.to(target).emit('answer', {
        from: socket.id,
        answer
      });
    });

    socket.on('ice-candidate', ({ target, candidate }) => {
      io.to(target).emit('ice-candidate', {
        from: socket.id,
        candidate
      });
    });

    // Handle chat messages
    socket.on('group-message', ({ roomId, message }) => {
      io.to(roomId).emit('group-message', {
        from: socket.id,
        username: socket.username,
        message,
        timestamp: Date.now()
      });
    });

    socket.on('private-message', ({ target, message }) => {
      io.to(target).emit('private-message', {
        from: socket.id,
        username: socket.username,
        message,
        timestamp: Date.now()
      });
      // Also send to sender for their own record
      socket.emit('private-message', {
        from: socket.id,
        to: target,
        username: socket.username,
        message,
        timestamp: Date.now()
      });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      if (socket.roomId && rooms[socket.roomId]) {
        // Remove user from room
        delete rooms[socket.roomId].users[socket.id];
        
        // Notify others
        socket.to(socket.roomId).emit('user-left', {
          userId: socket.id,
          username: socket.username
        });
        
        // If room is empty, clean up
        if (Object.keys(rooms[socket.roomId].users).length === 0) {
          delete rooms[socket.roomId];
        }
      }
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
}

module.exports = { setupSignalingServer };