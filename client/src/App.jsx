import {  BrowserRouter,Route,Routes} from "react-router-dom";
import Home from './Pages/Home'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/login" element={<>Login page</>}></Route>
    </Routes>
    </BrowserRouter>
    
  )
}

export default App
