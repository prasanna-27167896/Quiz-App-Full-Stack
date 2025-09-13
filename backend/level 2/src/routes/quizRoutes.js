const express = require("express");
const {
  submitQuiz,
  completedQuizQuestions,
} = require("../controllers/submitController.js");
const authenticateUser = require("../middlewares/userMiddleware.js");

const quizRouter = express.Router();

quizRouter.post("/submit", authenticateUser, submitQuiz);
quizRouter.get(
  "/completed-quiz-questions",
  authenticateUser,
  completedQuizQuestions
);

module.exports = quizRouter;
