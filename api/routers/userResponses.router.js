import express from "express";
import {
  submitUserResponse,
  getUserResponse,
} from "../controllers/userResponse.controller.js";

const router = express.Router();

router.post("/saveUserResponse/:pollId", submitUserResponse);
router.get("/getUserResponse/:pollId/:userId", getUserResponse);

export default router;
