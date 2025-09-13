const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "username, email, passowrd are required to register",
      });
    }

    const isEmailExist = await User.findOne({ email });

    if (isEmailExist) {
      return res.status(400).json({
        success: false,
        message: "Email already present, Please login",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to Register user" });
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and passowrd are required to login",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: `No user exists with ${email} email id`,
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET_TOKEN,
      {
        expiresIn: "7d",
      }
    );

    res
      .status(200)
      .json({ success: true, message: "Logged in successfully", accessToken });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to login",
    });
    console.log(error);
  }
};

const quizAttemptes = async (req, res) => {
  try {
    const userId = req.user._id;
    const attempts = await User.findById(userId).populate("quiz_attempts");
    console.log(attempts);

    res.status(200).json({ attempts: attempts.quiz_attempts });
  } catch (error) {
    console.error("Error fetching quiz attempts", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to Logged out" });
  }
};

module.exports = { register, login, quizAttemptes, logout };
