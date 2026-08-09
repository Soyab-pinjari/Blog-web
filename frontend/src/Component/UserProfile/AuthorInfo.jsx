import React, { useContext, useEffect, useState } from 'react'
import userContext from '../../Context/userContext'

import { authorProfile, getauthorBlogs } from '../../services/api';
import { useParams } from 'react-router'
import Navbar from '../Navbar';

function AuthorInfo() {
    const {id}=useParams();
    const [author,setAuthor] = useState({})
    const [blogs,setBlogs]=useState([])
    const BannerImage = author?.banner 
    ?`http://localhost:3000/uploads/${author?.banner}`:"http://localhost:3000/default-banner.jpeg";

    const profileImage = author?.profileImage
    ?`http://localhost:3000/uploads/${author?.profileImage}`:"http://localhost:3000/default-avatar.jpg";
 
        const fetchUser = async () => {
        try {
            const res = await authorProfile(id);
            setAuthor(res.user);
          
        } catch (error) {
            console.log(error);
        }
        };
        const fetchBlogs = async () => {
        try {
            const res = await getauthorBlogs(id);
            setBlogs(res);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
        };
    useEffect(()=>{
    fetchUser();
    fetchBlogs();
            
    },[id])

  return (
      <div className="min-h-screen bg-gray-100 py-10">
        <Navbar/>

      <div className="max-w-5xl mx-auto pt-20 bg-white rounded-xl shadow-sm overflow-hidden">

        {/* Cover Image */}
        <div className="h-64 relative">
          <img
            src={BannerImage}
            alt="cover"
            className="w-full h-full object-cover"
          />

          {/* Profile Image */}
          <div className="absolute -bottom-16 left-10">
            <img
              src={profileImage}
              alt="profile"
              className="w-36 h-36 rounded-full border-4 border-white object-cover"
            />
          </div>
        </div>


        {/* User Info */}
        <div className="pt-20 px-10 pb-8">

          <h1 className="text-3xl font-bold text-gray-900">
            {author.username}
          </h1>


          <p className="text-gray-600 mt-4 text-lg">
            {author.bio || "No bio added yet"}
          </p>


          <div className="flex items-center gap-8 mt-6 text-gray-500">

            <div className="flex items-center gap-2">
              <span>📍</span>
              <span>
                {author.location || "india"}
              </span>
            </div>


            <div>
              Joined :{" "}
              {new Date(author.createdAt).toLocaleDateString(
                "en-IN",
                {
                  day:"2-digit",
                  month:"short",
                  year:"numeric"
                }
              )}
            </div>

          </div>

        </div>


        {/* Blogs Section */}
        <div className="px-10 pb-10">

          <h2 className="text-2xl font-bold text-blue-600 border-b-4 border-blue-600 inline-block pb-2">
             Blogs
          </h2>


          <div className="mt-8 space-y-5">

            {blogs?.length > 0 ? (
              blogs.map((blog)=>(
                <div
                  key={blog._id}
                  className="flex items-center gap-5 border rounded-xl p-4 hover:shadow-md transition"
                >

                 
                  <img
                    src={`http://localhost:3000/uploads/blogs/${blog.coverImage}`}
                    alt={blog.title}
                    className="w-48 h-28 rounded-lg object-cover"
                  />


                  <div className="flex-1">

                    <h3 className="text-xl font-semibold text-gray-900">
                      {blog.title}
                    </h3>


                    <p className="text-gray-500 mt-2">
                      Published At :{" "}
                      {new Date(blog.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                          day:"2-digit",
                          month:"short",
                          year:"numeric"
                        }
                      )}
                    </p>

                    <p className="text-sm text-gray-400 mt-2">
                      {blog.category}
                    </p>
                  </div>


                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No blogs published yet.
              </p>
            )}

          </div>

        </div>

      </div>

    </div>
  )
}

export default AuthorInfo
