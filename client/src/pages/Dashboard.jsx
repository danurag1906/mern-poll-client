import React from "react";
import { useSelector } from "react-redux";

import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";

export default function Dashboard() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      {!currentUser && <p>Please sign in</p>}
      {currentUser && currentUser.admin ? (
        <AdminDashboard />
      ) : (
        currentUser && <UserDashboard />
      )}
    </>
  );
}
