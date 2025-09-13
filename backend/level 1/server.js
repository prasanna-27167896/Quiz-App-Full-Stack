const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./utils/db.js");
const questionRouter = require("./routes/questionRoutes.js");
dotenv.config();
const path = require("path");

const app = express();

//Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Database connection
connectDB();

//View Engine setup
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.set(express.static(path.join(__dirname, "public")));

//Routes
app.use("/api/v1/questions", questionRouter);

//Error handling middleware
//404 Error
app.use((req, res, next) => {
  const error = new Error("Page not found");
  error.status = 404;
  next(error);
});

//general Error handler
app.use((error, req, res, next) => {
  res.locals.message = error.message;
  res.locals.error = process.env.NODE_ENV === "development" ? error : {};
  res.status(error.status || 500);
  res.render("error"); //Render the error template
});

//Server Start

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
