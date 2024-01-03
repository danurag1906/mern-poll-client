import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const PollPieChart = ({ pollId }) => {
  const [chartData, setChartData] = useState([]);
  // console.log(pollId);

  useEffect(() => {
    const fetchPollStatistics = async () => {
      try {
        const response = await fetch("https://punfz49o59.execute-api.ap-south-1.amazonaws.com/Deploy/getPollStatisticsById",{
          method:'POST',
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify({pollId})//send the body as an object
        })

        // console.log(response);
        if (response.ok) {
          const data = await response.json();
          const optionsArray=JSON.parse(data.body);
          // console.log(JSON.parse(data.body));

          if (
            Array.isArray(optionsArray) &&
            optionsArray.length>0
            // optionsArray.every((stat) => typeof stat.data === "number")
          ) {
            setChartData(optionsArray);
          } else {
            console.log("Invalid data format");
          }
        } else {
          console.log("Failed to fetch poll statistics");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPollStatistics();
  }, [pollId]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div>
      <h3>Poll statistics</h3>
      <PieChart width={400} height={300}>
        <Pie
          data={chartData}
          dataKey="votes"
          nameKey="text"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      {/* <pre>{JSON.stringify(chartData, null, 2)}</pre> */}
    </div>
  );
};

export default PollPieChart;
