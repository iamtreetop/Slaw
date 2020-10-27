const express = require("express");
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const channels = require("./routes/api/channels");
const events = require("./routes/api/events");
const todos = require("./routes/api/todos");
const passport = require('passport');
const User = require("./models/User")
const bodyParser = require("body-parser")

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

app.use(passport.initialize());

const port = process.env.PORT || 5500;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});