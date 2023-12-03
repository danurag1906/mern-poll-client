import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routers/auth.router.js";

dotenv.config();

mongoose
  .connect(
    "mongodb+srv://mern-poll:mern-poll@cluster0.2drg2p9.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to db!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("server is running on port 3000!");
});

app.get("/api/auth/getUser", (req, res) => {
  res.json("hello from user");
});

app.use("/api/auth", authRouter);

//middleware for error handling
app.use((err, req, res, next) => {
  //err-> the error created
  //next->going to the next middleware (function basically)
  const statusCode = err.statusCode || 500; //500 means an error happened in the server
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
