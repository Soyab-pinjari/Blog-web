import React from 'react'
import { Route } from 'react-router'
import Navbar from '../Component/Navbar'
import Hero from '../Pages/Hero'
import FeaturedBlog from '../Pages/FeaturedBlog'
import Footer from '../Component/Footer'
import About from '../Pages/About'



function MainLayout() {
  return (
    <div>
    <Navbar/>
    <Hero/>
    {/* <Steps/> */}
    <FeaturedBlog/>
    <section id='aboutPage'>

    <About/>
    </section>
    <Footer/>
    </div>
  )
}

export default MainLayout
