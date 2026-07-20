import { useEffect, useState } from 'react'
import CreateBlog from './Component/Blog/CreateBlog'
import Signup from './Forms/SignUp'
import Signin from './Forms/Signin'

import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Navbar from './Component/Navbar'
import Hero from './Pages/Hero'
import FeaturedBlog from './Pages/FeaturedBlog'
import AllBlogs from './Pages/AllBlogs'
import EditProfile from './Component/UserProfile/EditProfile'
// import { GetAllBlogs } from './services/api'

import userContext from './Context/userContext'


function App() {
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('user'))||null);

  return (
    <>

    <userContext.Provider value={{ user, setUser }}>

     <Routes>
      <Route path='/' element={<MainLayout/>}></Route>
      <Route path='/navbar' element={<Navbar/>}></Route>
      <Route path='/register' element={<Signup/>}></Route>
      <Route path='/login' element={<Signin/>}></Route>
      <Route path='/profile' element={<EditProfile/>}></Route>
      <Route path='/create' element={<CreateBlog/>}></Route>
      <Route path='/blogs' element={<AllBlogs/>}></Route>
     
     </Routes>
    </userContext.Provider>
    </>
  )
}

export default App
