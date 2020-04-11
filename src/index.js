const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const PORT = 4000 || process.env.PORT;

app.get("/", (req, res) => {
  res.send("<h1>serverrrrr<h1>");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on('topic', (topic) => {
    console.log(`topic: ${JSON.stringify(topic)}`)
    io.emit('topic', topic)
  })
});

http.listen(PORT, () => {
  console.log("listening on *:4000");
});
