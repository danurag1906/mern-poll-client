import React from "react";
import { useSelector } from "react-redux";

import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";

export default function Dashboard() {
  const { currentUser } = useSelector((state) => state.user);

  // console.log(currentUser);
  const userObject=JSON.parse(currentUser.body);
  const isAdmin=userObject.user.isAdmin;



  return (
    <>
      {!currentUser && (
        <p className="text-center m-10 font-bold">Please sign in</p>
      )}
      {isAdmin ? (
        <AdminDashboard />
      ) : (
        currentUser && <UserDashboard />
      )}
    </>
  );
}
