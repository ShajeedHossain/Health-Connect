const express = require("express");
const app = express();
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User_ID: ", socket.id);

  // joinRoom(socket);
  // sendMessage(socket);
  // disconnect(socket);
});
