import {
  BrowserRouter,
  Route, Routes
} from "react-router-dom";
import Home from './Pages/Home'
import Login from "./Components/Login/Login";
import Errorelement from "./Components/ErrorElement/Errorelement";
import Blogs from "./Components/Blogs/Blogs";
import Newblog from "./Components/NewBlog/Newblog";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home></Home>} errorElement={<Errorelement></Errorelement>}>
          <Route path="/login" element={<Login></Login>} errorElement={<Errorelement></Errorelement>}></Route>
          <Route index element={<Blogs></Blogs>} errorElement={<Errorelement></Errorelement>}></Route>
          <Route path="/newblog" element={<Newblog />}></Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
