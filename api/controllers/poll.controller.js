import Poll from "../models/poll.models.js";
import UserResponse from "../models/userResponses.models.js";

export const createPoll = async (req, res, next) => {
  try {
    const pollData = req.body;
    const resData = await Poll.create(pollData);
    res.status(200).json(resData);
  } catch (error) {
    next(error);
  }
};

export const getPolls = async (req, res, next) => {
  //   console.log("inside getPolls");
  try {
    const polls = await Poll.find().sort({ createdAt: "desc" });
    res.status(200).json(polls);
  } catch (error) {
    next(error);
  }
};

export const getPoll = async (req, res, next) => {
  try {
    const { pollId } = req.params;
    const pollData = await Poll.findById(pollId);
    res.status(200).json(pollData);
  } catch (error) {
    next(error);
  }
};

export const updatePoll = async (req, res, next) => {
  //   console.log("inseide updatePoll");
  try {
    const { pollId } = req.params;
    const updatedPollData = req.body;

    // Update the poll by its ID
    const updatedPoll = await Poll.findByIdAndUpdate(pollId, updatedPollData, {
      new: true,
    });

    if (!updatedPoll) {
      return res.status(404).json({ error: "Poll not found" });
    }

    res.status(200).json(updatedPoll);
  } catch (error) {
    next(error);
  }
};

export const deletePoll = async (req, res, next) => {
  try {
    const { pollId } = req.params;
    const deletedPoll = await Poll.findByIdAndDelete(pollId);

    if (!deletedPoll) {
      return res.status(404).json({ error: "Poll not found" });
    }

    //delete user responses associated with the poll
    await UserResponse.deleteMany({ pollId });

    res.json({ message: "Poll and associated responses deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getPollStatistics = async (req, res, next) => {
  try {
    const { pollId } = req.params;
    const poll = await Poll.findById(pollId);
    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }

    const statistics = poll.options.map((option) => ({
      label: option.text,
      data: option.votes,
    }));

    res.json(statistics);
  } catch (error) {
    next(error);
  }
};
