import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
// import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  //   const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState(null);
  //state data coming from userSlice
  const { currentUser, loading, error } = useSelector((state) => state.user);

  // console.log("before submit : ", currentUser, loading, error);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      //using spread operator to not the existing typed data
      ...formData,
      //useing th id's given to the input tags to change the values in the input.
      [e.target.id]: e.target.value,
    });
  };
  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    // console.log("inside handle submit", loading);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        //if there is an error coming from the next() middleware
        // console.log("inside handle submit", data.message);
        // console.log(data.message);
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      // console.log("inside handle submit", data);
      navigate("/dashboard");
      // console.log(data);
    } catch (error) {
      //catch the error on client or browser side
      dispatch(signInFailure(error.message));
      // console.log("inside handle submit", error.message);
      //   console.log(error.message);
    }
  };

  // console.log("after submit : ", currentUser, loading, error);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-90"
        >
          {loading ? "Loading..." : "SIGN IN"}
        </button>
        {/* <OAuth /> */}
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to={"/signup"}>
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
