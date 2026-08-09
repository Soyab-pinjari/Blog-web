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

export const GetAllBlogs = async(category)=>{
   const url = category
    ? `${BASE_URL}/blog?category=${category}`
    : `${BASE_URL}/blog/`;
    const {data} = await axios.get(url);
    console.log(data);
     return data;

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
    
  })
    .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  });
  
};

export const authorProfile = async(id)=>{
  try {
    const response = await axios.get(`${BASE_URL}/user/profile/${id}`)
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
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

  const response = await axios.get(`${BASE_URL}/blog/${slug}`,{
    headers:{
      Authorization:`Bearer ${localStorage.getItem("token")}`
    },
  })

  return response.data;
}

export const getauthorBlogs=async(id)=>{
  try {
    const response = await axios.get(`${BASE_URL}/blog/author/${id}`)
      console.log("API response:", response.data);
    return response.data
  } catch (error) {
    console.log(error)
  }
} 

export const deleteBlog = async(slug)=>{
      console.log("API slug:", slug); 
    const response = await axios.delete(`${BASE_URL}/blog/delete/${slug}`,
         {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
    )
     return response.data;
}
