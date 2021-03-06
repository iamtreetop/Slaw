const express = require("express");
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const channels = require("./routes/api/channels");
const events = require("./routes/api/events");
const todos = require("./routes/api/todos");
const comments = require("./routes/api/comments");
const passport = require('passport');
const User = require("./models/User")
const bodyParser = require("body-parser")
const path = require('path');
const cors = require("cors");

app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://slaw-app.herokuapp.com"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
}

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({
    extended: false
  }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/users", users)
app.use("/api/channels", channels)
app.use("/api/events", events)
app.use("/api/todos", todos)
app.use("/api/comments", comments);
app.use(passport.initialize());

const port = process.env.PORT || 5500;

const socketio = require('socket.io')
const http = require('http')
const server = http.createServer(app);
const io = socketio(server, {'wsEngine': 'ws'});
const Message = require('./models/Message')
const formatMessage = require('./util-message/message-format')

io.on('connection', (socket) => {
  console.log("connected to websocket")
  socket.on('create', (room) => {
    if (!socket.rooms[room] !== room) {
      socket.join(room);
    }    
  });
  socket.on('message', (msg) => {
    const message = new Message({
      message: msg.message,
      username: msg.username,
      time: msg.time,
      day: msg.day
    });
    // Save the message to the database.
    message.save((err) => {
      if (err) return console.error(err);
    });
    // Notify all other users about a new message.
    socket.broadcast.to(msg.room).emit('push', msg)
    // socket.broadcast.emit('push', msg);
  });

});
io.on('disconnect', () => {
  console.log("disconnected to websocket")
  io.emit('message', 'A user has left the chat')
})

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});