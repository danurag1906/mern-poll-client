import React from "react";
import CreatePoll from "../pages/CreatePoll";
import PollList from "./PollList";

export default function AdminDashboard() {
  return (
    <div className="flex">
      <div
        className="w-1/2"
        style={{ position: "fixed", top: 100, left: 100, overflowY: "auto" }}
      >
        <CreatePoll />
      </div>
      <div className="w-1/2" style={{ marginLeft: "50%" }}>
        <PollList />
      </div>
    </div>
  );
}
