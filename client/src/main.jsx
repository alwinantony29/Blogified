import React from 'react'
import ReactDOM from 'react-dom/client'
import UserContext from './Context/userContext.jsx'
import { Route, RouterProvider,createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import SignIn from './Components/Login/Login.jsx'
import CreateBlog from './Components/Blogs/CreateBlog.jsx'
import Errorelement from './Components/ErrorElement/Errorelement.jsx'
import  {Blogs} from "./Components/Blogs/Blogs.jsx"
import SingleBlog from './Components/Blogs/SingleBlog.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path="/" element={<Home/>}  errorElement={<Errorelement/>}>
      <Route index element={<Blogs/>} />
      <Route path="/login" element={<SignIn />}/>
      <Route path="/newblog" element={<CreateBlog />}/>
      <Route path='/myblogs' />
      <Route path="/:blogID" element={<SingleBlog/>} />
      <Route path="contactus" element={<>Contact cheyy mwone</>} />
    </Route>
  ))
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <UserContext>
    <RouterProvider router={router} />
  </UserContext>
  // </React.StrictMode>, 
)
