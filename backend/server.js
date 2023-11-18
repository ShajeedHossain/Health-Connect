//imports
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const errorHandler = require("./middlewares/errorMiddleware");
const mongoose = require("mongoose");
const Message = require("./model/messageSchema");

//middlewares
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

//route imports
const userRoutes = require("./routes/userRoutes");
const patientRoutes = require("./routes/patientRoutes");
const adminRoutes = require("./routes/adminRoutes");
const devRoutes = require("./routes/devRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");

//routes
app.use("/api/user", userRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/dev", devRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/hospital", hospitalRoutes);

//db connection
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

//SOCKET RELATED
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

function disconnect(socket) {
  socket.on("disconnect", () => {
    console.log("Disconnected: ", socket.id);
  });
}

function joinRoom(socket) {
  socket.on("join_room", (appointment_id) => {
    socket.join(appointment_id);
    console.log("Room joined: ", appointment_id);
  });
}

function sendMessage(socket) {
  socket.on("send_message", async (data) => {
    console.log(data);
    socket.to(data.appointment_id).emit("receive_message", data);
    const messageSave = await Message.create({
      senderId: data.senderId,
      receiverId: data.receiverId,
      senderName: data.senderName,
      receiverName: data.receiverName,
      message: data.message,
      time: data.time,
    });
    console.log("MESSAGE SAVED: ", messageSave);
  });
}

function getPreviousMessage(socket) {
  socket.on("prev_messages", async (data) => {
    const prevMessages = await Message.find({
      senderId: data.senderId,
      receiverId: data.receiverId,
    });
    console.log("PREV EMSSAGE: ", prevMessages);
    socket.emit("receive_prev_message", prevMessages);
  });
}

io.on("connection", (socket) => {
  console.log("Connected user_ID: ", socket.id);
  getPreviousMessage(socket);
  joinRoom(socket);
  sendMessage(socket);
  disconnect(socket);
});

//error handler
app.use(errorHandler);

server.listen(3000, () => {
  console.log("Socket listening on port http://localhost:3000/");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`App listening on http://localhost:${process.env.PORT}`);
});
