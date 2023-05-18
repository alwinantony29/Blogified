import {  BrowserRouter,Route,Routes} from "react-router-dom";
import Home from './Pages/Home'
import {  useRouteError} from "react-router-dom";
import { useEffect, useState } from "react";
import LoginPage from "./Pages/LoginPage";
function App () {
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   fetch("http://localhost:5000/message")
  //     .then((res) => res.json())
  //     .then((data) => {setMessage(data.message)
  //     console.log(data.message);});
  // }, []);
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/login" element={<LoginPage></LoginPage>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
