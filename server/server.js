const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

const PORT = 3000;

io.on('connection', socket => {
  console.log(`User connected: ${socket.id}`);
  socket.on('join-room', (roomId, userId) => {
    if (!roomId || !userId) {
      console.error("Invalid roomId or userId:", roomId, userId);
      return;
    }

    console.log(`User ${userId} joined room: ${roomId}`);
    socket.join(roomId);
    socket.to(roomId).emit('user-connected', userId);

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${userId}`);
      socket.to(roomId).emit('user-disconnected', userId);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
