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
}

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));




app.use(passport.initialize());
require('./config/passport')(passport);

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


const port = process.env.PORT || 5000;



const socketio = require('socket.io');
const http = require('http')
const server = http.createServer(app);
const io = socketio(server);
const Message = require('./models/Message')
// io.origins('*')

io.on('connection', (socket) => {

  // Get the last 10 messages from the database.
  console.log("connected to websocket")
  Message.find().sort({ createdAt: -1 }).limit(10).exec((err, messages) => {
    if (err) return console.error(err);

    // Send the last messages to the user.
    socket.emit('init', messages);
  });

  // Listen to connected users for a new message.
  socket.on('message', (msg) => {
    // Create a message with the content and the name of the user.
    const message = new Message({
      content: msg.content,
      name: msg.name,
    });

    // Save the message to the database.
    message.save((err) => {
      if (err) return console.error(err);
    });

    // Notify all other users about a new message.
    socket.broadcast.emit('push', msg);
  });

  socket.on('diconnect', () => {
    io.emit('message', 'A user has left the chat')
  })
});




server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});


