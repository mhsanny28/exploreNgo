import { faTaxi } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { FaBox, FaCamera, FaHome, FaHotel } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import DropDownMenu from "../dropDown/dropdown";
import "./navbar.css";
const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navContainer items-center">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">ExploreNGo</span>
        </Link>
        <div className=" flex flex-row justify-start ml-20 mt-3 gap-4 mb-3 items-center">
          <Link to="/" className="text-white  flex gap-2 items-center active">
            <FaHome />
            <span>Home</span>
          </Link>
          <Link to="/hotels" className="text-white flex gap-2 items-center ">
            <FaHotel />
            <span>Hotels</span>
          </Link>
          <Link to="/photograph" className="text-white flex gap-2 items-center">
            <FaCamera />
            <span>Photographers</span>
          </Link>
          <Link to="/taxis" className="text-white flex gap-2 items-center">
            <FontAwesomeIcon icon={faTaxi} />
            <span> taxis</span>
          </Link>
          <Link to="/package" className="text-white flex gap-2 items-center">
            <FaBox />
            <span>Packages</span>
          </Link>
        </div>
        {user ? (
          <DropDownMenu />
        ) : (
          <div className="navItems">
            <Link to="/register" className="navButton">
              Register
            </Link>
            <Link to="/login" className="navButton">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
