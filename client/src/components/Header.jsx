import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import { useSelector } from "react-redux";
// import { useState, useEffect } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success == false) {
        dispatch(signOutUserFailure());
      }
      dispatch(signOutUserSuccess());
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };
  //   const [searchTerm, setSearchTerm] = useState("");
  //   const navigate = useNavigate();

  return (
    <header className="bg-slate-200 shadow-md sticky top-0 z-10 w-full">
      <div className="flex justify-around items-center mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap cursor-pointer">
            <span className="text-slate-500">Polling App</span>
          </h1>
        </Link>

        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden font-bold sm:inline text-slate-700 hover:underline cursor-pointer">
              Home
            </li>
          </Link>
          {/* <Link to="/about">
            <li className="hidden font-bold sm:inline text-slate-700 hover:underline cursor-pointer">
              About
            </li>
          </Link> */}
          {!currentUser && (
            <Link to="/signin">
              <li className=" font-bold sm:inline text-slate-700 hover:underline cursor-pointer">
                Sign In
              </li>
            </Link>
          )}
          {currentUser && (
            <Link onClick={handleSignOut}>
              <li className=" font-bold sm:inline text-slate-700 hover:underline cursor-pointer">
                Sign Out
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
