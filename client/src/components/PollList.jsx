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
    // console.log("inside deletepoll");
    const resData = await fetch(`/api/polls/deletePoll/${pollId}`, {
      method: "DELETE",
    });
    fetchPolls();
  };

  const fetchPolls = async () => {
    try {
      const response = await fetch("/api/polls/getPolls");
      if (response.ok) {
        const data = await response.json();
        setPolls(data);
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
          key={poll._id}
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
              to={`/updatePoll/${poll._id}`}
              className="w-full p-1 bg-green-600 text-white rounded-md"
            >
              Update
            </Link>
            <button
              className="w-full p-1 bg-red-600 text-white rounded-md"
              onClick={() => {
                handleDeletePoll(poll._id);
              }}
            >
              Delete
            </button>
            <button
              onClick={() => {
                setViewStatistics(poll._id);
              }}
              className="w-full p-1 bg-blue-600 text-white rounded-md"
            >
              {" "}
              Statistics
            </button>
          </div>
          {viewStatistics === poll._id && <PollPieChart pollId={poll._id} />}
        </div>
      ))}
    </div>
  );
};

export default PollList;
