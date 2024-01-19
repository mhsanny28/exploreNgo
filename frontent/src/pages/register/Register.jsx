import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { baseUrl } from "../../baseUrl";
import Navbar from "../../components/navbar/Navbar";

const Register = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [fullname, setFullname] = useState("");
  const [userName, setUserName] = useState("");
  const [country, setCountry] = useState("");
  const [mobile, setMobile] = useState("");

  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const eChng = (e) => {
    setEmail(e.target.value);
  };
  const fnChng = (e) => {
    setFullname(e.target.value);
  };
  const pChng = (e) => {
    setPass(e.target.value);
  };

  const cChng = (e) => {
    setCountry(e.target.value);
  };
  const mChng = (e) => {
    setMobile(e.target.value);
  };

  const uChng = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(`${baseUrl}/api/user/signup`, {
        email: email,
        password: pass,
        fullname: fullname,
        country: country,
        username: userName,
        mobile: mobile,
      });

      Swal.fire({
        icon: "success",
        title: "Registration Success",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log("sussecc", res);
      setLoading(false);
      navigate("/login");
    } catch (err) {
      console.log("register error", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login ">
        <form
          className="lContainer shadow-xl bg-white p-16  rounded-xl"
          onSubmit={handleSubmit}
        >
          <h3>Please Register</h3>
          <input
            type="email"
            placeholder="Email"
            onChange={eChng}
            className="lInput rounded  border-2 border-gray-200"
          />
          <input
            type="text"
            placeholder="Mobile Number"
            onChange={mChng}
            className="lInput rounded  border-2 border-gray-200"
          />

          <input
            type="text"
            placeholder="Full Name"
            id="username"
            onChange={fnChng}
            className="lInput rounded  border-2 border-gray-200"
          />
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={uChng}
            className="lInput rounded  border-2 border-gray-200"
          />
          <input
            type="text"
            placeholder="Country"
            id="username"
            onChange={cChng}
            className="lInput rounded  border-2 border-gray-200"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={pChng}
            className="lInput rounded  border-2 border-gray-200"
          />
          <button
            type="submit"
            className="bg-blue-400 rounded py-2"
            value={loading ? "Loading..." : "Submit"}
            style={{ cursor: loading ? "not-allowed" : "pointer" }}
          >
            Register
          </button>

          {error && <span>{error.message}</span>}

          <p style={{ marginTop: "10px" }}>
            <Link to="/login"> Already have an account? Log in here..</Link>
          </p>
        </form>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Register;
