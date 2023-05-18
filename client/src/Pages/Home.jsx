import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Blogs from '../Components/Blogs/Blogs'
import Footer from '../Components/Footer/Footer'
import { useRouteError } from 'react-router-dom'

function Home() {
  return (
    <>
    <Navbar></Navbar>
    <Blogs></Blogs>
    <Footer></Footer>
    </>
  )
}

export default Home