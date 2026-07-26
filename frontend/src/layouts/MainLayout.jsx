import React from 'react'
import { Route } from 'react-router'
import Navbar from '../Component/Navbar'
import Hero from '../Pages/Hero'
import FeaturedBlog from '../Pages/FeaturedBlog'
import Footer from '../Component/Footer'



function MainLayout() {
  return (
    <div>
    <Navbar/>
    <Hero/>
    <FeaturedBlog/>
    <Footer/>
    </div>
  )
}

export default MainLayout
