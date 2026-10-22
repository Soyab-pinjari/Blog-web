import { createSlice } from "@reduxjs/toolkit";

initialState={
    blogs:[],
    loading:false,
    error:null,
}
const blogSlice = createSlice({

  name:blogs,
    initialState,
    reducers:{
        fetchBlogStart:(state,action)=>{
                state.loading=true;
                state.error=null;
        },
        setBlogs:(state,action)=>{
                state.blogs=action.payload;
                state.loading=false;
                state.error=null;
        },
        
    }
})