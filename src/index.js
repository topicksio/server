const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const colors = require("colors");
const morgan = require("morgan");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 5000;
const connectDB = require("../config/db");
const topics = require("../routes/topics");

connectDB();

app.use("/api/v1/topics", topics);

// Socket.io
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("topic", (topic) => {
    console.log(`topic: ${JSON.stringify(topic)}`);
    io.emit("topic", topic);
  });
});

console.log(PORT);

http.listen(PORT, () => {
  console.log(`listening on port ${PORT} in ${process.env.NODE_ENV} `);
});
