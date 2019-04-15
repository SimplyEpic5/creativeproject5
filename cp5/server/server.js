const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/questionquorner', {
  useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const users = require("./users.js");
app.use("/api/users", users.routes);

const questions = require("./questions.js");
app.use("/api/questions", questions.routes);

const comments = require("./comments.js");
app.use("/api/comments", comments.routes);

app.listen(3003, () => console.log('Server listening on port 3003!'));
