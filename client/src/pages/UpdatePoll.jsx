import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [postCreated, setPostCreated] = useState(false);
  const { pollId } = useParams();
  const navigate = useNavigate();

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = { text: value, votes: 0 };
    setOptions(newOptions);
  };

  useEffect(() => {
    fetchData();
  }, [pollId]);

  const fetchData = async () => {
    const res = await fetch("https://punfz49o59.execute-api.ap-south-1.amazonaws.com/Deploy/pollsById",{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({pollId})//send the body as an object
    });
    const pollData = await res.json();
    // console.log(JSON.parse(pollData.body));
    const pollDataObject=JSON.parse(pollData.body);
    setQuestion(pollDataObject.question);
    setOptions(pollDataObject.options);
  };

  const handleUpdatePoll = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://punfz49o59.execute-api.ap-south-1.amazonaws.com/Deploy/updatePollById', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pollId:pollId,
          question: question,
          options: options.filter((option) => option.text.trim() !== ""),
        }),
      });

      if (response.ok) {
        setLoading(false);
        setError("");
        setPostCreated(true);
        // Handle success, e.g., show a success message
        // console.log("Poll updated successfully");
        navigate("/dashboard");
      } else {
        setLoading(false);
        // Handle errors, e.g., show an error message
        setError("Failed to update poll");
        // console.error("Failed to create poll");
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
      //   console.error(error);
    }
  };

  return (
    // <></>
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create a New Poll</h2>
      <form>
        <div className="mb-4">
          <label
            htmlFor="question"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Question
          </label>
          <input
            type="text"
            id="question"
            className="w-full p-2 border rounded-md"
            placeholder="Enter your question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="options"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Options
          </label>
          {options.map((option, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder={`Option ${index + 1}`}
                value={option.text}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="w-full p-2 bg-blue-500 text-white rounded-md"
          onClick={handleUpdatePoll}
        >
          Update Poll
        </button>
      </form>
      {postCreated && (
        <p className="text-green-700">Poll Updated Successfully</p>
      )}
      {error && <p className="text-red-700">{error}</p>}
    </div>
  );
};

export default UpdatePoll;
