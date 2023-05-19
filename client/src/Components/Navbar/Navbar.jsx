import React, { useContext } from 'react'
import { auth } from '../../firebase/firebase';
import { useNavigate } from "react-router-dom";
import { userContext } from '../../Context/Context';
import { signOut } from 'firebase/auth';
function Navbar() {
  const { user, setUser } = useContext(userContext)
  const navigate = useNavigate()
  // logout function   
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
        <p className="navbar-brand ps-3">Blogified</p>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto pe-4">
            <li className='nav-item'>
              <button className="nav-link" onClick={() => navigate('/')}>Home</button>
            </li>
            <li className='nav-item'>
              <button className="nav-link" onClick={() => navigate('/newblog')}>New Blog</button>
            </li>
            <li className='nav-item'>
              <button className="nav-link" href="">contact us</button>
            </li>
            <li className='nav-item'>
              <button className="nav-link" onClick={() => navigate('/login')}>{user ? user.displayName : 'Login'}</button>
            </li>
            <li className='nav-item'>
              <button className="nav-link" onClick={() => signOut(auth).then(() => {
                // Sign-out successful.
                console.log('logout succesfull')
                setUser(null)
              }).catch((error) => {
                // An error happened.
                console.log(error);
              })} >Logout</button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar