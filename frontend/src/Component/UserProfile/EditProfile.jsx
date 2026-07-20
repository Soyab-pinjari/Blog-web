import React, { useContext, useEffect, useRef, useState } from 'react'
import Navbar from '../Navbar'
import userContext from '../../Context/userContext';
import { getProfile } from '../../services/api';
import axios from 'axios';
import ProfileTabs from './ProfileTabs';
import { Link } from 'react-router';


function EditProfile() {
  const profileInput = useRef(null);
  const bannerInput = useRef(null);
  const [profilePreview, setProfilePreview] = useState("");
  const [bannerPreview, setBannerPreview] = useState("");
  const {user,setUser}=useContext(userContext);
  const [formData, setFormData] = useState({
  bio: user?.bio || "",
  location: user?.location || "",
  });
  const [isEditing, setIsEditing] = useState(false);
  if (!user) return null;

  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

 const profileImage = user.profileImage
  ?  `http://localhost:3000/uploads/${user.profileImage}?v=${user.updatedAt}`
  : "http://localhost:3000/default-avatar.jpg";

const bannerImage = user.banner
  ? `http://localhost:3000/uploads/${user.banner}?v=${user.updatedAt}`
  : "http://localhost:3000/default-banner.jpeg";
  
  
  const handleProfileImage = async(e) => {
    const file = e.target.files[0];

    if (!file) return;

    setProfilePreview(URL.createObjectURL(file));
  const formData = new FormData();
  formData.append("profileImage", file);

   try {
    const res = await fetch("http://localhost:3000/user/profile-image", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    const data = await res.json();


setUser(data.user);


  } catch (err) {
    console.log(err);
  }
};
  
  const handleBannerImage = async(e) => {
    const file = e.target.files[0];

    if (!file) return;

    setBannerPreview(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("banner", file);

      try {
    const res = await fetch("http://localhost:3000/user/banner", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    const data = await res.json();

    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

const saveProfile = async () => {
  try {
    console.log("Token:", localStorage.getItem("token"));

    const res = await axios.patch(
      "http://localhost:3000/user/profile",
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (res.data.success) {
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
         setIsEditing(false);
    }
    
  } catch (err) {
    console.log(err.response?.data);
    console.log(err);
  }
};
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await getProfile();

      setUser(res.data.user);
      console.log("user ",user);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    }
  };

  fetchProfile();
}, []); // 
  


return (
    <>
      <Navbar/>
    <div className="min-h-screen bg-gray-100 flex pt-30 justify-center items-center p-5">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md overflow-hidden">

      {/* Cover Image */}
  <div
    className="h-44 w-full cursor-pointer"
    onClick={() => bannerInput.current.click()}
  >
  <img
    src={bannerImage || bannerPreview}
    alt="banner"
    className="w-full h-full object-cover"
  />

  <input
    type="file"
    accept="image/*"
    ref={bannerInput}
    hidden
    onChange={handleBannerImage}
  />
</div>

        {/* Profile Section */}
        <div className="relative px-8 pb-8">

          {/* Profile Image */}
          <div className="absolute -top-16 left-8">
            <img
              src={profileImage || profilePreview}
              alt="profile"
              className="w-32 h-32 rounded-full border-4 border-white object-cover"
            /><input
                type="file"
                accept="image/*"
                ref={profileInput}
                hidden
                onChange={handleProfileImage}
              />
              <button
  onClick={() => profileInput.current.click()}
  className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow"
>
 ➕   
</button>
          </div>

       


          {/* User Info */}
          <div className="pt-20">
            <h1 className="text-2xl font-bold text-gray-800">
              {user.username}
            </h1>

            {/* <p className="text-gray-400 text-sm">
              @sarah_wilson
            </p> */}


                        {isEditing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 mt-5"
                  rows={4}
                />
              ) : (
                <p
                  className="mt-5 text-gray-700 cursor-pointer"
                  onClick={() => setIsEditing(true)}
                >
                  {user.bio || "Click here to add your bio"}
                </p>
              )}

            {/* Details */}
            <div className="flex gap-8 mt-5 text-gray-500 text-sm">

             {isEditing ? (
  <input
    type="text"
    name="location"
    value={formData.location}
    onChange={handleChange}
    className="border rounded-lg px-3 py-2"
    placeholder="Enter your location"
  />
) : (
  <span
    className="cursor-pointer"
    onClick={() => setIsEditing(true)}
  >
    📍 {user.location || "Add location"}
  </span>
)}

              <span>
                 joined {user.createdAt &&
  new Date(user.createdAt).toISOString().split("T")[0]}

              </span>

            </div>

{isEditing && (
  <button
    onClick={saveProfile}
    className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg"
  >
    Save
  </button>
)}

{/* --------------------------------------myBlogs------------- */}
 <Link
  to="/create"
  className="inline-block mt-8 px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
>
  Create Blog
</Link>

<ProfileTabs/>


            {/* Stats */}
            {/* <div className="flex gap-8 mt-6">

              <div>
                <h2 className="font-bold text-lg">120</h2>
                <p className="text-gray-500 text-sm">
                  Posts
                </p>
              </div>

              <div>
                <h2 className="font-bold text-lg">5.2K</h2>
                <p className="text-gray-500 text-sm">
                  Followers
                </p>
              </div>

              <div>
                <h2 className="font-bold text-lg">340</h2>
                <p className="text-gray-500 text-sm">
                  Following
                </p>
              </div> */}
{/* 
            </div> */}

          </div>

        </div>

      </div>
    </div>

    </>
  )
}

export default EditProfile
