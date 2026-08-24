import React from 'react'
import { Route } from 'react-router'
import { motion } from 'framer-motion'
import Navbar from '../Component/Navbar'
import Hero from '../Pages/Hero'
import FeaturedBlog from '../Pages/FeaturedBlog'
import Footer from '../Component/Footer'
import About from '../Pages/About'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
}

function MainLayout() {
  return (
    <div>
      <Navbar />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={0}
      >
        <Hero />
      </motion.div>

      {/* <Steps/> */}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        custom={1}
      >
        <FeaturedBlog />
      </motion.div>

      <motion.section
        id="aboutPage"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        custom={2}
      >
        <About />
      </motion.section>

      <Footer />
    </div>
  )
}

export default MainLayout