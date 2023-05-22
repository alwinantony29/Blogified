import {
  BrowserRouter,
  Route, Routes
} from "react-router-dom";
import Home from './Pages/Home'
import Login from "./Components/Login/Login";
import Errorelement from "./Components/ErrorElement/Errorelement";
import Blogs from "./Components/Blogs/Blogs";
import Newblog from "./Components/NewBlog/Newblog";
import {  loader as BlogLoader} from "./Components/Blogs/Blogs";
import SignIn from "./Components/Login/Login";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home/>} loader={BlogLoader} errorElement={<Errorelement></Errorelement>}>
          <Route path="/login" element={<SignIn/>} errorElement={<Errorelement></Errorelement>}></Route>
          <Route index element={<Blogs/>} errorElement={<Errorelement></Errorelement>}></Route>
          <Route path="/newblog" element={<Newblog />}></Route>
          <Route path="contactus" element={<Errorelement/>}></Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
