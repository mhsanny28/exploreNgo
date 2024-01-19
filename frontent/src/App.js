import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Package from "./pages/Package/Package";
import Photographers from "./pages/PhotoGrapher/Photographers";
import Taxis from "./pages/Taxis/Taxis";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import MyBookings from "./pages/myBookings/MyBookings";
import Register from "./pages/register/Register";
import MyProfile from "./pages/profile/MyProfile";
import Update from "./pages/profile/Update";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/taxis" element={<Taxis />} />
        <Route path="/photograph" element={<Photographers />} />
        <Route path="/package" element={<Package />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/profile/:id" element={<MyProfile />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
