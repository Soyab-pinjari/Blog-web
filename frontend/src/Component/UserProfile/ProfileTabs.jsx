import React from 'react'
import { deleteBlog, getUserBlogs } from '../../services/api';
import { useState } from 'react';
import { useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router';
const BASE_URL = import.meta.env.VITE_API_URL
function ProfileTabs() {
    const [blogs,setBlogs]= useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedSlug, setSelectedSlug] = useState(null);
    const fetchBlogs= async ()=>{
        try {
            const data = await getUserBlogs();
           
            setBlogs(data);
        } catch (error) {
            console.log(error)
        }
    }
    console.log("blog data",blogs);

const handleDelete = async (selectedSlug) => {
       
  try {
    console.log("Deleting:", selectedSlug);

    const data = await deleteBlog(selectedSlug);
    console.log(data);

    setBlogs((prev) =>
      prev.filter((blog) => blog.slug !== selectedSlug)
    );

    setShowDeleteModal(false);
    setSelectedSlug(null);

  } catch (error) {
    console.log(error);
  }
};

    useEffect(()=>{
        fetchBlogs();
        
    },[])


  return (
    <div>
     <h1 className="text-1xl font-bold mt-5 mb-5 text-blue-500 border-b-4 border-blue-500 pb-2 inline-block">
  My Blogs
</h1>
      {
        (blogs.map((blog)=>(
          <div className='flex justify-between items-center bg-white rounded-xl p-4 shadow-sm border'>
             <Link to={`/blog/${blog.slug}`} className="flex gap-7 flex-1">

        <div className="flex gap-7">

          <img
            src={`${BASE_URL}/uploads/blogs/${blog.coverImage}`}
            alt=""
            className="w-40 h-24 rounded-lg object-cover"
          />

          <div>
            <h2 className="text-xl font-semibold">
             {blog.title}
            </h2>

           <p className="text-gray-500 mt-2">
              Published At :  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                })}
                </p>
          </div>

        </div>

        </Link>
        <button class={btn} className="text-gray-500 hover:text-red-500"  onClick={() => {
             console.log(blog.slug);
            
    setSelectedSlug(blog.slug);
    setShowDeleteModal(true);
  }}>

          <FiTrash2 size={22} />
                
        </button> 
{showDeleteModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white rounded-xl p-6 w-96 shadow-lg">

      <h2 className="text-xl font-semibold">
        Delete Blog?
      </h2>

      <p className="text-gray-500 mt-2">
        Are you sure you want to delete this blog? This action cannot be undone.
      </p>


      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => setShowDeleteModal(false)}
          class={btn}
          className="px-4 py-2 rounded-lg border"
        >
          Cancel
        </button>


        <button
         onClick={(e) =>{ e.preventDefault();
          
    e.stopPropagation(); handleDelete(selectedSlug)}}
    class={btn}     
          className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
        >
          Delete
        </button>

      </div>
    </div>

  </div>
)}
    
</div>
        )))
      }
      
    </div>
  )
}

export default ProfileTabs
