const express = require("express");
const {
  register,
  login,
  logout,
  quizAttemptes,
} = require("../controllers/userController.js");
const authenticationUser = require("../middlewares/userMiddleware.js");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/quiz-attempts", authenticationUser, quizAttemptes);

module.exports = userRouter;
