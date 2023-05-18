import {
  BrowserRouter,
  RouterProvider, Route, Routes
} from "react-router-dom";
import Home from './Pages/Home'
import { useRouteError } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./Components/Login/Login";
import Errorelement from "./Components/ErrorElement/Error-element";
import Blogs from "./Components/Blogs/Blogs";
function App() {

  // const [message, setMessage] = useState("");
  // useEffect(() => {
  //   fetch("http://localhost:5000/message")
  //     .then((res) => res.json())
  //     .then((data) => {setMessage(data.message)
  //     console.log(data.message);});
  // }, []);

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home></Home>} errorElement={<Errorelement></Errorelement>}>
           <Route path="/login" element={<Login></Login>} errorElement={<Errorelement></Errorelement>}></Route>
           <Route index element={<Blogs></Blogs>}></Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
