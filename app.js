// server.js
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const PORT=3001;
app.use(cors())

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
io.on('connection', (socket) => {
  console.log('A user connected');

  // Generate a random username for the new user
  const username = `User Id: ${Math.floor(Math.random() * 1000)}`;
  socket.emit('setUsername', username);

  // Broadcast message to all clients, excluding the sender
  socket.on('message', (message) => {
    console.log('message=====> :>> ', message);
    io.emit('message', { username, message });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
