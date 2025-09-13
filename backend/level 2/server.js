const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./src/utils/db");
const userRouter = require("./src/routes/userRoutes.js");
const questionRouter = require("./src/routes/questionRoutes.js");
const quizRouter = require("./src/routes/quizRoutes.js");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

//express Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//database connection
db();

//routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/quiz", quizRouter);

//connect server
app.listen(PORT, () => {
  console.log(`Server is on port ${PORT}...💻`);
});
