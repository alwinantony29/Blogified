import React, { useContext } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase/firebase';
import  { userContext } from '../Context/Context';

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
      
        <Navbar></Navbar>
        <Outlet></Outlet>
      
    </>
  )
}

export default Home