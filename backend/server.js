const express = require('express');
const http = require('http');
const cors = require('cors');
const { setupSignalingServer } = require('./signaling');

const app = express();
const server = http.createServer(app);

// Apply CORS middleware
app.use(cors());

// Basic route for testing
app.get('/', (req, res) => {
  res.send('WebRTC Signaling Server is running');
});

// Setup Socket.IO signaling
setupSignalingServer(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});