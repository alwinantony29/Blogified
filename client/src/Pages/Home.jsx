import React from 'react'
import NavBar from '../Components/Navbar/NavBar';
import { Outlet } from 'react-router-dom';

function Home() {
  return (
    <>
      {/* <div style={{ backgroundColor: "#808080", height: "380vh" }}> */}
        <NavBar />
        <Outlet />
      {/* </div> */}
    </>
  )
}

export default Home