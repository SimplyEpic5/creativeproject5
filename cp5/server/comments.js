const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

const users = require("./users.js");
const User = users.model;

const questions = require("./questions.js");
const Question = questions.model;

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  question: {
    type: mongoose.Schema.ObjectId,
    ref: 'Question'
  },
  text: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const Comment = mongoose.model('Comment', commentSchema);

// upload comment
router.post("/", auth.verifyToken, User.verify, async (req, res) => {
  try {
    let question = await Question.find({
      _id: req.body.questionID
    })

    const comment = new Comment({
      user: req.user,
      question: question[0],
      text: req.body.text,
    });

    await comment.save();
    return res.sendStatus(200);

  } catch (error){
    console.log(error);
    return res.sendStatus(500);
  }
});

// get comments for question
router.get("/comments/:id", async (req, res) => {
  try {
    let question = await Question.find({
      _id: req.params.id
    });

    let comments = await Comment.find({
      question: question
    }).sort({
      created: -1
    }).populate('user');

    return res.send(comments);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Comment.deleteOne({
      _id: req.params.id
    }, function (err) {
      if (err) return res.sendStatus(500);
    })

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.put("/", async (req, res) => {
  try {
    await Comment.updateOne({_id: req.body.commentID}, {
      text: req.body.text,
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = {
  model: Comment,
  routes: router,
}
