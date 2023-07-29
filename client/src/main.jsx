import ReactDOM from 'react-dom/client'
import UserContext from './Context/userContext.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Root from './Layout/RootLayout.jsx'
import SignIn from './Components/Login/Login.jsx'
import CreateBlog from './Components/Blogs/CreateBlog.jsx'
import { Blogs } from "./Components/Blogs/Blogs.jsx"
import SingleBlog from './Components/Blogs/SingleBlog.jsx'
import { MyBlogs } from './Components/Blogs/MyBlogs.jsx'
import EditBlog from './Components/Blogs/EditBlog.jsx'
import UsersList from './Components/Admin/usersList/usersList.jsx'
import React from 'react'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} >
      <Route index element={<Blogs />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/newblog" element={<CreateBlog />} />
      <Route path='/myblogs' element={<MyBlogs />} />
      <Route path="/blogs/:blogID" element={<SingleBlog />} />
      <Route path="/edit/:blogID" element={<EditBlog />} />
      <Route path="/myprofile" element={<>My profile Page Coming soon</>} />
      <Route path="/admin" element={<UsersList />} />
    </Route>
  ))
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContext>
      <RouterProvider router={router} />
    </UserContext>
  </React.StrictMode>,
)
