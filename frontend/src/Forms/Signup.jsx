import React, { useState } from "react";

import { signUpUser } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
function Signup() {
        const [username,setUsername]=useState('');
        const [email,setEmail]=useState('');
        const [password,setPassword]=useState('');
        const [errorMsg, setErrorMsg] = useState('');
        const [successMsg, setSuccessMsg] = useState('');
const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log("button clickd")
        try {
            const data = await signUpUser({
                username,
                email,
                password
            });
            console.log("dadasdfs",data);
            setSuccessMsg(data.message);
            
            setErrorMsg('');
          navigate("/login");
        } catch (error) {
             setErrorMsg(
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong"
    );
    setSuccessMsg(''); 
        }
    }   
  return (
    <form onSubmit={handleSubmit}>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-3xl font-bold mb-2">
          Create Account
        </h1>

        <p className="text-gray-500 mb-5">
          Join Blogy and start sharing your stories.
        </p>

        {/* error masagess ------------------------------------------*/}
              {errorMsg && (
            <p className="  text-center text-red-500">
                {errorMsg}
            </p>
            )}

            {successMsg && (
            <p className=" text-center  text-green-600">
                {successMsg}
            </p>
            )}
            {/* complete-------------------------------------- */}
            
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">
            Username
          </label>

          <input
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-500"
            />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-500"
          />
        </div>

        <button  type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700">
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <span className="text-indigo-600 font-medium cursor-pointer">
            <Link  to="/login">
            Login
            </Link>
          </span>
        </p>
      </div>
    </div>
            </form>
  );
};

export default Signup;