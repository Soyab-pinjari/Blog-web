import React, { useContext, useState } from 'react'

import { loginUser } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

import userContext from '../Context/userContext';



function Signin() {
  const [email,setEmail]= useState('');
  const [password,setPassword]=useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(''); 
  
  const {setUser} = useContext(userContext);
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    
    e.preventDefault();
    try {
      const data = await loginUser({
        email,
        password
      })
  
       console.log("Full response:", data);
  console.log("User object:", data.user);
      if(data) {
        
        localStorage.setItem("token",data.token);
        localStorage.setItem("user",JSON.stringify(data.user));
      
        setSuccessMsg(data.message);
        setErrorMsg('');
        navigate('/');

       setUser(data.user);
      }
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
          Welcome Back
        </h1>

        <p className="text-gray-500 mb-8">
          Login to continue to Blogy.
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
        <div className="mb-5" >
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

        <button type='submit' className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700">
          Login
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <span className="text-indigo-600 font-medium cursor-pointer">
          <Link to="/register">
            Sign Up
          </Link>
          </span>
        </p>
      </div>
    </div>

            </form>
  )
}

export default Signin

