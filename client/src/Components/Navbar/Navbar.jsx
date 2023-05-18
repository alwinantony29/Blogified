import React from 'react'
import { auth } from '../../firebase/firebase';
import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate()

  // logout function
   const logOut = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        navigate('/login')
    }).catch((error) => {
        // An error happened.
    });
}
  return (
    <>
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand ps-3">Blogified</a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto pe-4">
            <li className='nav-item'>
              <a className="nav-link" href="">Home</a>
            </li>
            <li className='nav-item'>
              <a className="nav-link" href="">New Blog</a>
            </li>
            <li className='nav-item'>
              <a className="nav-link" href="">contact us</a>
            </li>
            <li className='nav-item'>
              <a className="nav-link" href="/login">Login</a>
            </li>
            <li className='nav-item'>
              <a className="nav-link" onClick={logOut} href="/login">Logout</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar