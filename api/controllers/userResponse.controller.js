import Poll from "../models/poll.models.js";
import UserResponse from "../models/userResponses.models.js";

export const submitUserResponse = async (req, res, next) => {
  // console.log("submitUserResponse");
  try {
    const { pollId } = req.params;
    const { optionId, userId } = req.body;

    // console.log("poll id", pollId);
    // console.log("option id", optionId);
    // console.log("user id", userId);

    // Check if the user has already voted for this poll
    const existingResponse = await UserResponse.findOne({ userId, pollId });
    // console.log("existingresponse");

    if (existingResponse) {
      return res.status(200).json({
        error: "User has already voted for this poll",
        alreadyVoted: true,
      });
    }

    //save user response
    const userResponse = await UserResponse.create({
      userId,
      pollId,
      optionId,
    });

    //update the poll count in poll schema
    await Poll.updateOne(
      { _id: pollId, "options._id": optionId },
      { $inc: { "options.$.votes": 1 } }
    );

    res.status(201).json({ ...userResponse, alreadyVoted: false });
  } catch (error) {
    next(error);
  }
};

export const getUserResponse = async (req, res, next) => {
  try {
    const { pollId, userId } = req.params;
    const userResponse = await UserResponse.find({ pollId, userId });
    res.json(userResponse);
  } catch (error) {
    next(error);
  }
};
