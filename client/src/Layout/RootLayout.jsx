import React from 'react'
import NavBar from '../Components/Navbar/NavBar';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { Toaster } from 'react-hot-toast';

function Root() {
  return (
    <>
      <Toaster />
      <NavBar />
      {/* box is there to just push everything down below the navbar */}
      <Box sx={{ height: 70, width: "100%" }}></Box>
      <Outlet />
    </>
  )
}

export default Root