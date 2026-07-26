import React, { useState } from 'react'
import { BlogCreate } from '../../services/api';
import BlogEditor from '../BlogEditor';
import { Link, useNavigate } from 'react-router';
import Navbar from '../Navbar';
function CreateBlog() {

  const [title,setTitle]=useState('');
    const [file, setFile] = useState(null);
    const [content,setContent]=useState('');
    const [category, setCategory] = useState("");
     const [errorMsg, setErrorMsg] = useState('');
      const [successMsg, setSuccessMsg] = useState(''); 
    const navigate = useNavigate();
    
    const handleSubmit =async (e) =>{
     e.preventDefault();
    if (!file) return alert("Add Cover Image");

    const formData = new FormData();
    formData.append("title",title);
    formData.append('content',content);
    formData.append("category",category);
    formData.append("coverImage", file);
    try {
        const response = await BlogCreate(
            formData
        )
         console.log(response);
         navigate('/');
    } catch (error) {
        setErrorMsg(
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong")
            setSuccessMsg(''); 

    }
  } 
 return (
<>
<Navbar/>
  <form method="POST" onSubmit={handleSubmit} className='pt-20' encType='multipart/form-data'>

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm p-8">

        <Link to={'/profile'} className="text-indigo-600 mb-4 cursor-pointer">

          ← Back
        </Link>

        <h1 className="text-2xl font-semibold mb-8">
          Create New Blog
        </h1>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block text-sm font-medium mb-2">
              Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Blog Title"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-500"
              />
          </div>
      

          <div>
            <label className="block text-sm font-medium mb-2">
              Category
            </label>

           <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
            >
            <option value="">Select category</option>
            <option value="Technology">Technology</option>
            <option value="Travel">Travel</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="Bussiness">Bussiness</option>
            <option value="Programming">Programming</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Entertainment">Entertainment</option>
        </select>
          </div>

        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium mb-2"  htmlFor="cover-upload" >
            Cover Image
          </label>
            <label
                    htmlFor="cover-upload"
                    className="w-full md:w-1/2 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition"
                    >
                    {file ? (
                      <div className="text-center">
                        <p className="text-green-600 font-medium">{file.name}</p>
                        <p className="text-sm text-gray-500 mt-1">
                        Click to change image
                        </p>
                    </div>) : (
                      <div className="text-center">
                        <p className="text-gray-600 text-lg">📷 Upload Cover Image</p>
                        <p className="text-sm text-gray-400 mt-1">
                        Click here to choose an image
                        </p>
                    </div>
                    )}
                </label>

                <input
                    id="cover-upload"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
             
        </div>
         <label className="block mb-2 font-semibold">
        Content
      </label>

      <BlogEditor
        content={content}
        setContent={setContent}
        />

        <div className="flex justify-end gap-4 mt-10">


          <button  type="submit" className="bg-indigo-600 text-white px-7 py-3 rounded-lg hover:bg-indigo-700">
            Publish
          </button>

        </div>

      </div>
    </div>
            </form>
            </>
  );
}

export default CreateBlog
