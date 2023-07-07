import ReactDOM from 'react-dom/client'
import UserContext from './Context/userContext.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import SignIn from './Components/Login/Login.jsx'
import CreateBlog from './Components/Blogs/CreateBlog.jsx'
// import ErrorElement from './Components/ErrorElement/ErrorElement.jsx'
import { Blogs, loader as blogsLoader } from "./Components/Blogs/Blogs.jsx"
import SingleBlog from './Components/Blogs/SingleBlog.jsx'
import { MyBlogs } from './Components/Blogs/MyBlogs.jsx'
import EditBlog from './Components/Blogs/EditBlog.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />}  >
      <Route index element={<Blogs />} loader={blogsLoader}  />
      <Route path="/login" element={<SignIn />}  />
      <Route path="/newblog" element={<CreateBlog />}  />
      <Route path='/myblogs' element={<MyBlogs />} />
      <Route path="/blogs/:blogID" element={<SingleBlog />} />
      <Route path="/edit/:blogID" element={<EditBlog />} />
      <Route path="contactus" element={<>Contact Page</>} />
    </Route>
  ))
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <UserContext>
    <RouterProvider router={router} />
  </UserContext>  
  // </React.StrictMode>, 
)
