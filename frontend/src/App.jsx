import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Restaurant from "./pages/Restaurant";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddRestaurant from "./pages/AddRestaurant";

export default function App(){
return(
  <div className="min-h-screen">
    <NavBar/>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/ajouter" element={<AddRestaurant/>}/>
      <Route path="/" element={<Home/>} />
      <Route path="/restaurant/:id" element={<Restaurant/>} />
    </Routes>
  </div>
);
}