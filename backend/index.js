const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');

const authRoute = require("./routes/AuthRoute");
const otpRoute = require('./routes/OtpRoute');
const profileRoute = require('./routes/user')
const todo = require('./routes/Todo')
const messageRoute = require('./routes/messageRoutes')

const http = require('http');
const { Server } = require('socket.io');
const { MONGO_URL, PORT } = process.env;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
  }
});


mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());

app.use(bodyParser.json());

app.use("/", authRoute);

app.use("/api/auth", otpRoute);

app.use("/api/user", profileRoute);

app.use("/api/todo", todo);

app.use("/api", messageRoute)

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', async (msg) => {
    const newMessage = new Message(msg);
    await newMessage.save();
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

