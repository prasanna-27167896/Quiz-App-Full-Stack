const mongoose = require("mongoose");

const QUIZ_STATUS_PENDING = "pending";
const QUIZ_STATUS_COMPLETED = "completed";

const ANSWER_STATUS_PENDING = "pending";
const ANSWER_STATUS_RIGHT = "right";
const ANSWER_STATUS_WRONG = "wrong";

const userQuizSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
    },
    quiz_status: {
      type: String,
      enum: [QUIZ_STATUS_PENDING, QUIZ_STATUS_COMPLETED],
    },
    questions: [
      {
        _id: false,
        question_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
        },
        attempted: Boolean,
        answer_status: {
          type: String,
          enum: [
            ANSWER_STATUS_PENDING,
            ANSWER_STATUS_RIGHT,
            ANSWER_STATUS_WRONG,
          ],
        },
        submitted_answer: {
          _id: false,
          id: Number,
          value: String,
        },
      },
    ],

    result: {
      correct_count: {
        type: Number,
        default: 0,
      },
      incorrect_count: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

//instance methods
userQuizSchema.methods.updateResults = function () {
  let result = this.questions.reduce(
    (acc, currentValue) => {
      if (currentValue.answer_status === ANSWER_STATUS_RIGHT) {
        acc["correct_count"] += 1;
      } else if (currentValue.answer_status === ANSWER_STATUS_WRONG) {
        acc["incorrect_count"] += 1;
      }
      return acc;
    },
    {
      correct_count: 0,
      incorrect_count: 0,
    }
  );
  this.result = result;
  this.save();
};

const UserQuiz = mongoose.model("UserQuiz", userQuizSchema);

module.exports = {
  UserQuiz,
  QUIZ_STATUS_COMPLETED,
  QUIZ_STATUS_PENDING,
  ANSWER_STATUS_PENDING,
  ANSWER_STATUS_RIGHT,
  ANSWER_STATUS_WRONG,
};
