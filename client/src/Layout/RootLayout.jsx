import React from 'react'
import NavBar from '../Components/Navbar/NavBar';
import { Outlet } from 'react-router-dom';

function Root() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

export default Root