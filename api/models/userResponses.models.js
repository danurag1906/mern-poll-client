// models/userResponse.js
import mongoose from "mongoose";

const userResponseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  pollId: { type: mongoose.Schema.Types.ObjectId, ref: "Poll", required: true },
  optionId: { type: mongoose.Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now },
});

const UserResponse = mongoose.model("UserResponse", userResponseSchema);

export default UserResponse;
