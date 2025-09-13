const express = require("express");
const {
  getQuestions,
  validateAnswer,
} = require("../controllers/questionController.js");
const authenticateUser = require("../middlewares/userMiddleware.js");

const questionRouter = express.Router();

questionRouter.get("/", authenticateUser, getQuestions);
questionRouter.post("/validate-answer", authenticateUser, validateAnswer);

module.exports = questionRouter;
