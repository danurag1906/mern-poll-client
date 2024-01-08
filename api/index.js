import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routers/auth.router.js";
import pollRouter from "./routers/poll.router.js";
import responsesRouter from "./routers/userResponses.router.js";

dotenv.config();

mongoose
  .connect(
    process.env.MONGO_URL
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
app.use("/api/polls", pollRouter);
app.use("/api/responses", responsesRouter);

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
