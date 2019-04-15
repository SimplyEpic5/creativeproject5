const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

const users = require("./users.js");
const User = users.model;

const questionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  title: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const Question = mongoose.model('Question', questionSchema);

// upload question
router.post("/", auth.verifyToken, User.verify, async (req, res) => {

  const question = new Question({
    user: req.user,
    title: req.body.title,
  });
  try {
    await question.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get my questions
router.get("/", auth.verifyToken, User.verify, async (req, res) => {
  // return questions
  try {
    let questions = await Question.find({
      user: req.user
    }).sort({
      created: -1
    });
    return res.send(questions);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get all questions
router.get("/all", async (req, res) => {
  try {
    let questions = await Question.find().sort({
      created: -1
    }).populate('user');
    return res.send(questions);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get single question
router.get("/question/:id", async (req, res) => {
  try {
    let question = await Question.find({
      _id: req.params.id
    }).populate('user');
    return res.send(question);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let question = await Question.find({
      _id: req.params.id
    })

    if (question != null && question[0] != null){
      const comments = require("./comments.js");
      const Comment = comments.model;

      await Comment.deleteMany({
        question: question
      }, function (err) {
        if (err) return res.sendStatus(500);
      })

      await Question.deleteOne({
        _id: req.params.id
      }, function (err) {
        if (err) return res.sendStatus(500);
      })
    }

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: Question,
  routes: router,
}
