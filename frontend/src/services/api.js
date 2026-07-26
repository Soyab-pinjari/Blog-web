import axios from "axios";
const BASE_URL = "http://localhost:3000"

export const signUpUser = async (userData)=>{
    const info= await axios.post(`${BASE_URL}/user/register`,userData);
    return info.data;
}

export const loginUser = async (userData)=>{
    const info = await axios.post(`${BASE_URL}/user/login`,userData);
    return info.data;
    
}

export const BlogCreate = async(BlogData)=>{
    const token = localStorage.getItem("token");
    const response = await axios.post(`${BASE_URL}/blog/create`,BlogData,{
           headers: {
            "Content-Type": "multipart/form-data",
             Authorization: `Bearer ${token}`
        },
    });
    return response.data;
}

export const GetAllBlogs = async()=>{
    const response = await axios.get(`${BASE_URL}/blog/`);
     return response.data;
}

//profile---------------------------------------

export const GetUserInfo = async()=>{
    const response = await axios.get(`${BASE_URL}/user`)
}

export const getProfile = () => {
  return axios.get("http://localhost:3000/user/profile", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getUserBlogs = async()=>{
 
    const response = await axios.get(`${BASE_URL}/blog/user`,
     {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    });
    return response.data;
}
export const getblogDetails = async (slug)=>{
  const response = await axios.get(`${BASE_URL}/blog/${slug}`)
  return response.data;
}

export const deleteBlog = async(slug)=>{
      console.log("API slug:", slug); // add this
    const response = await axios.delete(`${BASE_URL}/blog/delete/${slug}`,
         {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
    )
     return response.data;
}