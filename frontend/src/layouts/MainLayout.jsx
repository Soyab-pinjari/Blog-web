import React from 'react'
import { Route } from 'react-router'
import Navbar from '../Component/Navbar'
import Hero from '../Pages/Hero'
import FeaturedBlog from '../Pages/FeaturedBlog'



function MainLayout() {
  return (
    <div>
    <Navbar/>
    <Hero/>
    <FeaturedBlog/>
    </div>
  )
}

export default MainLayout
