import express from "express";
import {
  createPoll,
  deletePoll,
  getPoll,
  getPolls,
  updatePoll,
  getPollStatistics,
} from "../controllers/poll.controller.js";

const router = express.Router();

router.post("/createPoll", createPoll);
router.get("/getPolls", getPolls);
router.get("/getPoll/:pollId", getPoll);
router.post("/updatePoll/:pollId", updatePoll);
router.delete("/deletePoll/:pollId", deletePoll);
router.get("/getPollStatistics/:pollId", getPollStatistics);

export default router;
