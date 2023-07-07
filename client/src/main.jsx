import ReactDOM from 'react-dom/client'
import UserContext from './Context/userContext.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import SignIn from './Components/Login/Login.jsx'
import CreateBlog from './Components/Blogs/CreateBlog.jsx'
import ErrorElement from './Components/ErrorElement/ErrorElement.jsx'
import { Blogs, loader as blogsLoader } from "./Components/Blogs/Blogs.jsx"
import SingleBlog from './Components/Blogs/SingleBlog.jsx'
import { MyBlogs } from './Components/Blogs/MyBlogs.jsx'
import EditBlog from './Components/Blogs/EditBlog.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />}  errorElement={<ErrorElement />}>
      <Route index element={<Blogs />} loader={blogsLoader}  errorElement={<ErrorElement />}/>
      <Route path="/login" element={<SignIn />} errorElement={<ErrorElement />} />
      <Route path="/newblog" element={<CreateBlog />} errorElement={<ErrorElement />} />
      <Route path='/myblogs' element={<MyBlogs />} errorElement={<ErrorElement />}/>
      <Route path="/blogs/:blogID" element={<SingleBlog />} errorElement={<ErrorElement />}/>
      <Route path="/edit/:blogID" element={<EditBlog />} errorElement={<ErrorElement />}/>
      <Route path="contactus" element={<>Contact Page</>} errorElement={<ErrorElement />}/>
    </Route>
  ))
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <UserContext>
    <RouterProvider router={router} />
  </UserContext>
  // </React.StrictMode>, 
)
