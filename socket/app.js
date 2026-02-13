import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://your-frontend-domain.vercel.app", // replace later
    ],
    credentials: true,
  },
});

let onlineUsers = [];

// Remove User
const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

// Get User
const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

// Add Online User
const addOnlineUser = (userId, socketId) => {
  let userExists = onlineUsers.find((user) => user.userId === userId);

  if (userExists) {
    userExists.socketId = socketId;
  } else {
    onlineUsers.push({ userId, socketId });
    console.log("Users:", onlineUsers);
  }
};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("newUser", (userId) => {
    addOnlineUser(userId, socket.id);
  });

  socket.on("sendMessage", ({ recieverId, data }) => {
    const receiver = getUser(recieverId);

    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", data);
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

// Render requires dynamic port
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
