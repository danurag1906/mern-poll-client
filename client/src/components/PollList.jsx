
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PollPieChart from "./PollPieChart";

const PollList = () => {
  const [polls, setPolls] = useState([]);
  const [viewStatistics, setViewStatistics] = useState();

  useEffect(() => {
    // Fetch polls from the backend when the component mounts
    fetchPolls();
  }, []);

  const handleDeletePoll = async (pollId) => {
    const resData = await fetch('https://punfz49o59.execute-api.ap-south-1.amazonaws.com/Deploy/deletePollById', {
      method: "POST",
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({pollId})
    });
    fetchPolls();
  };

  const fetchPolls = async () => {
    try {
      const response = await fetch("https://punfz49o59.execute-api.ap-south-1.amazonaws.com/Deploy/polls");
      if (response.ok) {
        const data = await response.json();
        const pollData = JSON.parse(data.body);

        // Sort polls based on creation date (assuming there's a 'createdAt' property in each poll)
        const sortedPolls = pollData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setPolls(sortedPolls);
      } else {
        console.error("Failed to fetch polls");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">List of Polls</h2>
      {polls.map((poll) => (
        <div
          key={poll.pollId}
          className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md"
        >
          <h3 className="text-xl text-center font-semibold p-2">
            {poll.question}
          </h3>
          <ul className="ml-6 list-none block">
            {poll.options.map((option) => (
              <li
                className="w-full p-2 border rounded-md mb-2"
                key={option.optionId}
              >
                {option.text}
              </li>
            ))}
          </ul>
          <div className="flex justify-between p-2 m-2 gap-2">
            <Link
              to={`/updatePoll/${poll.pollId}`}
              className="w-full p-1 bg-green-600 text-white rounded-md"
            >
              Update
            </Link>
            <button
              className="w-full p-1 bg-red-600 text-white rounded-md"
              onClick={() => {
                handleDeletePoll(poll.pollId);
              }}
            >
              Delete
            </button>
            <button
              onClick={() => {
                setViewStatistics(poll.pollId);
              }}
              className="w-full p-1 bg-blue-600 text-white rounded-md"
            >
              Statistics
            </button>
          </div>
          {viewStatistics === poll.pollId && <PollPieChart pollId={poll.pollId} />}
        </div>
      ))}
    </div>
  );
};

export default PollList;
