import React from 'react'
import ReactDOM from 'react-dom/client'
import Context from './Context/Context.jsx'
import { Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import SignIn from './Components/Login/Login.jsx'
import CreateBlog from './Components/Blogs/CreateBlog.jsx'
import Errorelement from './Components/ErrorElement/Errorelement.jsx'
import blogLoader, {Blogs} from "./Components/Blogs/Blogs.jsx"
const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path="/" element={<Home/>}  errorElement={<Errorelement/>}>
      <Route index element={<Blogs/>} loader={blogLoader}/>
      <Route path="/login" element={<SignIn />}/>
      <Route path="/newblog" element={<CreateBlog />}/>
      <Route path="/blog" />
      <Route path="contactus" element={<>Contact cheyy mwonu</>} />
    </Route>
  ))
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Context>
    <RouterProvider router={router} />
  </Context>
  // </React.StrictMode>, 
)
