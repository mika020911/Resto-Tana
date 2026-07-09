import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Restaurant from "./pages/Restaurant";




export default function App(){
return(
  <div className="min-h-screen">
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/restaurant/:id" element={<Restaurant/>} />
    </Routes>
  </div>
);
}