const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully...");
  } catch (error) {
    console.log("Failed to connect MongDb...", error);
  }
};

module.exports = connectDB;
