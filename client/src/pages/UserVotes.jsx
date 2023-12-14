// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import PollPieChart from "../components/PollPieChart";

// export default function UserVotes() {
//   const [polls, setPolls] = useState([]);
//   const dispatch = useDispatch();
//   const [hasVoted, setHasVoted] = useState(false);
//   const userId = useSelector((state) => state.user.currentUser._id); // Assuming user ID is stored in Redux state

//   const [selectedOptions, setSelectedOptions] = useState({});

//   const [viewStatistics, setViewStatistics] = useState(null);

//   const handleVote = async (pollId, optionId) => {
//     // console.log(userId);

//     // const alreadyVoted = selectedOptions[pollId];

//     // if (alreadyVoted) {
//     //   console.log("already voted");
//     //   return;
//     // }

//     // Send a fetch request to the backend
//     try {
//       const response = await fetch(
//         `/api/responses/saveUserResponse/${pollId}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             optionId,
//             userId,
//           }),
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();

//         if (data.alreadyVoted) {
//           console.log("User has already voted for this poll");
//           setHasVoted(true);
//         } else {
//           // Update local state to mark that the user has voted for this poll
//           setSelectedOptions({ ...selectedOptions, [pollId]: optionId });
//           setHasVoted(true);
//         }
//       } else {
//         console.error("Failed to vote");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     // Fetch polls from the backend when the component mounts
//     fetchPolls();
//   }, []);

//   const fetchPolls = async () => {
//     try {
//       const response = await fetch("/api/polls/getPolls");
//       if (response.ok) {
//         const data = await response.json();
//         setPolls(data);
//       } else {
//         console.error("Failed to fetch polls");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-8">
//       <h2 className="text-2xl font-semibold mb-4">List of Polls</h2>
//       {polls.map((poll) => (
//         <div
//           key={poll._id}
//           className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md"
//         >
//           <h3 className="text-xl text-center font-semibold p-2">
//             {poll.question}
//           </h3>
//           <ul className="ml-6 list-none block">
//             {poll.options.map((option) => (
//               <li key={option._id} className="flex mb-2">
//                 <input
//                   type="radio"
//                   id={`option_${option._id}`}
//                   name={`pollOption_${poll._id}`}
//                   value={option._id}
//                   checked={selectedOptions[poll._id] === option._id}
//                   onChange={() =>
//                     setSelectedOptions({
//                       ...selectedOptions,
//                       [poll._id]: option._id,
//                     })
//                   }
//                   disabled={hasVoted}
//                 />
//                 <label htmlFor={`option_${option._id}`} className="ml-2">
//                   {option.text}
//                 </label>
//               </li>
//             ))}
//           </ul>
//           <div className="flex justify-between p-2 m-2 gap-2">
//             {hasVoted ? (
//               <p className="text-center text-green-500 font-semibold">
//                 You have already voted for this poll.
//               </p>
//             ) : (
//               <button
//                 className="w-full p-1 rounded-md
//               bg-blue-600 text-white hover:bg-blue-700"
//                 onClick={() => {
//                   handleVote(poll._id, selectedOptions[poll._id]);
//                 }}
//                 disabled={hasVoted}
//               >
//                 Vote
//               </button>
//             )}
//             <button
//               onClick={() => {
//                 setViewStatistics(poll._id);
//               }}
//               className="w-full p-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
//             >
//               {" "}
//               Statistics
//             </button>
//           </div>
//           {viewStatistics === poll._id && <PollPieChart pollId={poll._id} />}
//         </div>
//       ))}
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import PollPieChart from "../components/PollPieChart";

// export default function UserVotes() {
//   const [polls, setPolls] = useState([]);
//   const dispatch = useDispatch();
//   const [hasVoted, setHasVoted] = useState(false);
//   const userId = useSelector((state) => state.user.currentUser._id); // Assuming user ID is stored in Redux state

//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [existingData, setExistingData] = useState({});

//   const [viewStatistics, setViewStatistics] = useState(null);

//   const handleVote = async (pollId, optionId) => {
//     try {
//       const response = await fetch(
//         `/api/responses/saveUserResponse/${pollId}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             optionId,
//             userId,
//           }),
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();

//         if (data.alreadyVoted) {
//           console.log("User has already voted for this poll");
//           setExistingData({ ...existingData, [pollId]: true });
//           setHasVoted(true);
//         } else {
//           // Update local state to mark that the user has voted for this poll
//           setExistingData({ ...existingData, [pollId]: optionId });
//           setHasVoted(true);
//         }
//       } else {
//         console.error("Failed to vote");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     // Fetch polls from the backend when the component mounts
//     fetchPolls();
//   }, [userId]);

//   const fetchPolls = async () => {
//     try {
//       const response = await fetch("/api/polls/getPolls");
//       if (response.ok) {
//         const data = await response.json();
//         console.log("data", data);
//         console.log("selected optyions", existingData);

//         const optionsArray = await Promise.all(
//           data.map(async (poll) => {
//             const userResponse = await fetch(
//               `/api/responses/getUserResponse/${poll._id}/${userId}`
//             );
//             const userVote = await userResponse.json();
//             console.log("user responses", userVote);
//             if (userVote && userVote.length > 0) {
//               console.log("user vote", userVote);
//               const votedOption = poll.options.find(
//                 (option) => option._id === userVote[0].optionId
//               );

//               if (votedOption) {
//                 console.log("voted option", votedOption);
//                 return { [poll._id]: votedOption._id };
//               } else {
//                 return { [poll._id]: false };
//               }
//             } else {
//               console.log("else");
//               return { [poll._id]: false };
//             }
//           })
//         );

//         const initialOptions = Object.assign({}, ...optionsArray);
//         setExistingData(initialOptions);
//         console.log("selected options 2 ", existingData);
//         setPolls(data);
//       } else {
//         console.error("Failed to fetch polls");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-8">
//       <h2 className="text-2xl font-semibold mb-4">List of Polls</h2>
//       {polls.map((poll) => (
//         <div
//           key={poll._id}
//           className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md"
//         >
//           <h3 className="text-xl text-center font-semibold p-2">
//             {poll.question}
//           </h3>
//           <ul className="ml-6 list-none block">
//             {poll.options.map((option) => (
//               <li key={option._id} className="flex mb-2">
//                 <input
//                   type="radio"
//                   id={`option_${option._id}`}
//                   name={`pollOption_${poll._id}`}
//                   value={option._id}
//                   checked={selectedOptions[poll._id] === option._id}
//                   onChange={() =>
//                     setSelectedOptions({
//                       ...selectedOptions,
//                       [poll._id]: option._id,
//                     })
//                   }
//                   // disabled={selectedOptions[poll._id] !== false}
//                 />
//                 <label htmlFor={`option_${option._id}`} className="ml-2">
//                   {option.text}
//                 </label>
//               </li>
//             ))}
//           </ul>
//           <div className="flex justify-between p-2 m-2 gap-2">
//             {/* {existingData[poll._id]} */}
//             {existingData[poll._id] !== false ? (
//               <p className="text-center text-green-500 font-semibold">
//                 voted for this poll.
//               </p>
//             ) : (
//               <button
//                 className="w-full p-1 rounded-md
//               bg-blue-600 text-white hover:bg-blue-700"
//                 onClick={() => {
//                   handleVote(poll._id, selectedOptions[poll._id]);
//                 }}
//                 // disabled={selectedOptions[poll._id] !== false}
//               >
//                 Vote
//               </button>
//             )}
//             <button
//               onClick={() => {
//                 setViewStatistics(poll._id);
//               }}
//               className="w-full p-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
//             >
//               {" "}
//               Statistics
//             </button>
//           </div>
//           {viewStatistics === poll._id && <PollPieChart pollId={poll._id} />}
//         </div>
//       ))}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PollPieChart from "../components/PollPieChart";

export default function UserVotes() {
  const [polls, setPolls] = useState([]);
  const dispatch = useDispatch();
  const [hasVoted, setHasVoted] = useState(false);
  const userId = useSelector((state) => state.user.currentUser._id); // Assuming user ID is stored in Redux state

  const [selectedOptions, setSelectedOptions] = useState({});
  const [existingData, setExistingData] = useState({});
  const [selectedPollId, setSelectedPollId] = useState(
    existingData.length > 0 ? existingData[0]._id : null
  );
  const [viewStatistics, setViewStatistics] = useState(null);

  const handleVote = async (pollId, optionId) => {
    try {
      const response = await fetch(
        `/api/responses/saveUserResponse/${pollId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            optionId,
            userId,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (data.alreadyVoted) {
          console.log("User has already voted for this poll");
          setExistingData({ ...existingData, [pollId]: true });
          setHasVoted(true);
        } else {
          // Update local state to mark that the user has voted for this poll
          setExistingData({ ...existingData, [pollId]: optionId });
          setHasVoted(true);
        }
      } else {
        console.error("Failed to vote");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch polls from the backend when the component mounts
    fetchPolls();
  }, [userId]);

  const fetchPolls = async () => {
    try {
      const response = await fetch("/api/polls/getPolls");
      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        console.log("selected optyions", existingData);

        const optionsArray = await Promise.all(
          data.map(async (poll) => {
            const userResponse = await fetch(
              `/api/responses/getUserResponse/${poll._id}/${userId}`
            );
            const userVote = await userResponse.json();
            console.log("user responses", userVote);
            if (userVote && userVote.length > 0) {
              console.log("user vote", userVote);
              const votedOption = poll.options.find(
                (option) => option._id === userVote[0].optionId
              );

              if (votedOption) {
                console.log("voted option", votedOption);
                return { [poll._id]: votedOption._id };
              } else {
                return { [poll._id]: false };
              }
            } else {
              console.log("else");
              return { [poll._id]: false };
            }
          })
        );

        const initialOptions = Object.assign({}, ...optionsArray);
        setExistingData(initialOptions);
        console.log("selected options 2 ", existingData);
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
      <select
        className="p-2 rounded-md max-w-lg"
        value={selectedPollId}
        onChange={(e) => setSelectedPollId(e.target.value)}
      >
        {polls.map((poll) => (
          <option className="max-w-lg mx-auto" key={poll._id} value={poll._id}>
            {poll.question}
          </option>
        ))}
      </select>
      {selectedPollId && (
        <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md">
          <h3 className="text-xl text-center font-semibold p-2">
            {polls.find((poll) => poll._id === selectedPollId).question}
          </h3>
          <ul className="ml-6 list-none block">
            {polls
              .find((poll) => poll._id === selectedPollId)
              .options.map((option) => (
                <li key={option._id} className="flex mb-2">
                  <input
                    type="radio"
                    id={`option_${option._id}`}
                    name={`pollOption_${selectedPollId}`}
                    value={option._id}
                    checked={selectedOptions[selectedPollId] === option._id}
                    onChange={() =>
                      setSelectedOptions({
                        ...selectedOptions,
                        [selectedPollId]: option._id,
                      })
                    }
                    // disabled={selectedOptions[poll._id] !== false}
                  />
                  <label htmlFor={`option_${option._id}`} className="ml-2">
                    {option.text}
                  </label>
                </li>
              ))}
          </ul>
          <div className="flex justify-between p-2 m-2 gap-2">
            {/* {existingData[poll._id]} */}
            {existingData[selectedPollId] !== false ? (
              <p className="text-center text-green-500 font-semibold">
                voted for this poll.
              </p>
            ) : (
              <button
                className="w-full p-1 rounded-md 
              bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => {
                  handleVote(selectedPollId, selectedOptions[selectedPollId]);
                }}
                // disabled={selectedOptions[poll._id] !== false}
              >
                Vote
              </button>
            )}
            <button
              onClick={() => {
                setViewStatistics(selectedPollId);
              }}
              className="w-full p-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              {" "}
              Statistics
            </button>
          </div>
          {viewStatistics === selectedPollId && (
            <PollPieChart pollId={selectedPollId} />
          )}
        </div>
      )}
    </div>
  );
}
