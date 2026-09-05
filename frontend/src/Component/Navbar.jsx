import React, { useContext, useEffect, useState } from 'react'
import { FiSearch, FiBell ,FiUser, FiMessageSquare} from "react-icons/fi";
import { Link, useNavigate } from 'react-router';
import { getProfile } from "../services/api";
import userContext from '../Context/userContext';
import Search from './Search';
const BASE_URL = import.meta.env.VITE_API_URL

function Navbar() {

  const isLoggedIn = localStorage.getItem("token");
  const {user,setUser}=useContext(userContext);
  const navigate = useNavigate();
   
   const profileImage =user?.profileImage
  ?  user.profileImage
  : `${BASE_URL}/Default-avatar.jpg`;

const handleLogout = () => {
  try {
    const confirmLogout = window.confirm(
    "Are you sure you want to log out?"
  );

  if (!confirmLogout) return;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null); 
    navigate("/", { replace: true });
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

  return (
    <div>
       <nav className="fixed top-0 left-0 z-50 w-full bg-white shadow-sm border-b">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="text-3xl font-bold">
          Blogy<span className="text-blue-600">.</span>
        </div>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-10 font-medium">
          <li>
            <Link to={'/'} className="hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <Link to={'/blogs'} className="hover:text-blue-600 transition">
              Blogs
            </Link>
          </li>
          <li>
            <a href="#" className="hover:text-blue-600 transition">
              Categories
            </a>
          </li>
          <li>
            <a href='/aboutPage' className="hover:text-blue-600 transition">
              About
            </a>
          </li>
          <li>
            <Link to={'/contact'} className="hover:text-blue-600 transition">
              Contact
            </Link>
          </li>
        </ul>

        {/* Right Side */}
     <div className="flex items-center gap-3 lg:gap-4 min-w-0">
  <Search />



  {/* Notification */}
  {/* <button className="relative p-2 rounded-full hover:bg-gray-100">
    <FiBell className="text-xl" />
    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
  </button> */}

  {isLoggedIn ? (
    <>
      {/* Profile */}
      <Link
  to="/profile"
  className="flex items-center gap-2  rounded-lg px-3 py-2 hover:bg-gray-100"
>
  <img
    src={profileImage}
    alt="Profile"
      loading="lazy"
    className="w-10 h-10 rounded-full object-cover"
  />
</Link>
      
     <button
  onClick={handleLogout}
  
  className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
>
  Log out
</button>
    </>
  ) : (
    <>
      <Link
        to="/login"
        className="px-5 py-2 border rounded-lg font-medium hover:bg-gray-100 transition"
      >
        Login
      </Link>

      <Link
        to="/register"
        className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
      >
        Sign Up
      </Link>
    </>
  )}
</div>
      </div>
    </nav>
    
    </div>
  )
}

export default Navbar
