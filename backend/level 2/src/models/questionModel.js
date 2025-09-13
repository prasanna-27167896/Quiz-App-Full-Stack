const mongoose = require("mongoose");

const questionsSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  options: [
    {
      id: Number,
      value: String,
    },
  ],
  answer: {
    id: Number,
    value: String,
  },
});

const Question = mongoose.model("Question", questionsSchema);

module.exports = Question;
