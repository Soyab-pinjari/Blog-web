import { useEffect, useState } from 'react'
import CreateBlog from './Component/Blog/CreateBlog'


import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Navbar from './Component/Navbar'
import Hero from './Pages/Hero'
import FeaturedBlog from './Pages/FeaturedBlog'
import AllBlogs from './Pages/AllBlogs'
import EditProfile from './Component/UserProfile/EditProfile'
// import { GetAllBlogs } from './services/api'

import userContext from './Context/userContext'
import BlogPage from './Pages/BlogPage'
import ScrollToTop from './Component/ScrollToTop'
import ProfilePage from './Pages/ProfilePage'
import Contact from './Pages/Contact'
import AuthorInfo from './Component/UserProfile/AuthorInfo'
import About from './Pages/About'
import AdminLayout from './layouts/adminLayout'
import AdminDashboard from './Component/Dashboard/adminDashboard'
import AdminBlogs from './Pages/admin/AdminBlogs'
import AddBlog from './Pages/admin/AddBlog'
import AdminUsers from './Pages/admin/AdminUsers'
import AddUser from './Pages/admin/AddUser'
import AdminCategories from './Pages/admin/AdminCategories'
import AddCategory from './Pages/admin/AddCategory'
import EditCategory from './Pages/admin/EditCategory'



function App() {
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('user'))||null);

  return (
    <>
    <ScrollToTop/>
    <userContext.Provider value={{ user, setUser }}>

     <Routes>
      <Route path='/' element={<MainLayout/>}></Route>
      <Route path='/author/:id' element={<AuthorInfo/>}></Route>
      <Route path='/contact' element={<Contact/>}></Route>
      {/* <Route path='/about' element={<About/>}></Route> */}
      <Route path='/navbar' element={<Navbar/>}></Route>
      <Route path='/register' element={<Signup/>}></Route>
      <Route path='/login' element={<Signin/>}></Route>
      <Route path='/profile' element={<ProfilePage/>}></Route>
      <Route path='/create' element={<CreateBlog/>}></Route>
      <Route path='/blogs' element={<AllBlogs/>}></Route>
   <Route path="/blog/:slug"  element={<BlogPage/>}></Route>

   {/* Admin routes */}
    <Route path="/admin" element={<AdminLayout />}>

    <Route index element={<AdminDashboard />} />

    <Route path="blogs" element={<AdminBlogs />} />
    <Route path='blogs/add' element={<AddBlog/>}></Route>
    <Route path='users' element={<AdminUsers/>}></Route>
       <Route path="users/add" element={<AddUser />} />
       
         <Route path="categories" element={<AdminCategories />} />
    <Route path="categories/add" element={<AddCategory />} />
      <Route
        path="categories/edit/:id"
        element={<EditCategory />}
    />

</Route>
     
     </Routes>
    </userContext.Provider>
    </>
  )
}

export default App
