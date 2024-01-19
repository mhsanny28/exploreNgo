import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { baseUrl } from "../../baseUrl";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });
  const [er, setEr] = useState("");
  const { loading, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${baseUrl}/api/user/login`, credentials);
      console.log("login res", res.data);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.message.details });
      Swal.fire({
        icon: "success",
        title: "Logged In",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (err) {
      console.log("err", err.response.data.error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.error,
      });
      setEr("Authentication Failed");
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <>
      <Navbar />{" "}
      <div className="login">
        <div className="lContainer  shadow-xl bg-white p-16  rounded-xl">
          <h2>Please Login</h2>
          <input
            type="email"
            placeholder="Email"
            id="email"
            onChange={handleChange}
            className="lInput rounded  border-2 border-gray-200"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            className="lInput rounded  border-2 border-gray-200"
          />
          <button disabled={loading} onClick={handleClick} className="lButton ">
            Login
          </button>
          {er && (
            <span style={{ color: "red", textAlign: "center" }}>{er}</span>
          )}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Login;
