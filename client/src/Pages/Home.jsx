import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase/firebase';
import  { userContext } from '../Context/Context';
import NavBar from '../Components/Navbar/Appbar';

function Home() {
  const {setUser}=useContext(userContext)
    onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      const uid = user.uid;
      setUser(user)
      // ...
    } else {
      // User is signed out
      setUser(null)
      // ...
    }
  });
  return (
    <>
      
        {/* <Navbar></Navbar> */}
        {/* <ResponsiveAppBar></ResponsiveAppBar> */}
        <NavBar/>
        <Outlet></Outlet>
      
    </>
  )
}

export default Home