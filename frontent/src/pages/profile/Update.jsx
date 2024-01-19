import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { baseUrl } from "../../baseUrl";
import Navbar from "../../components/navbar/Navbar";

const Update = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [userName, setUserName] = useState("");
  const [country, setCountry] = useState("");
  const [mobile, setMobile] = useState("");
  const [data, setData] = useState(null);

  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  console.log("idddddddddddd", id);

  const eChng = (e) => {
    setEmail(e.target.value);
  };
  const fnChng = (e) => {
    setFullname(e.target.value);
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

  useEffect(() => {
    const datass = async () => {
      const res = await axios.get(`${baseUrl}/api/user/${id}`);
      console.log("users data in update", res.data.message);
      setData(res.data.message);
    };

    datass();


  }, [id]);

  useEffect(() => {
    if(data){
      setUserName(data?.username);
      setMobile(data?.mobile);
      setFullname(data?.fullname);
      setEmail(data?.email);
      setCountry(data?.country);
    }

  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.put(`${baseUrl}/api/user/${id}`, {
        email: email,
        fullname: fullname,
        country: country,
        username: userName,
        mobile: mobile,
      });

      Swal.fire({
        icon: "success",
        title: "Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log("sussecc", res);
      setLoading(false);
      navigate(`/profile/${id}`);
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
    <div>
      <Navbar />

      <div className="login ">
        <form
          className="lContainer shadow-xl bg-white p-16  rounded-xl"
          onSubmit={handleSubmit}
        >
          <h1 className=" text-center text-lg">User Update Form</h1>
          <input
            value={email}
            type="email"
            placeholder="Email"
            onChange={eChng}
            className="lInput rounded  border-2 border-gray-200"
          />
          <input
            value={mobile}
            type="text"
            placeholder="Mobile Number"
            onChange={mChng}
            className="lInput rounded  border-2 border-gray-200"
          />

          <input
            value={fullname}
            type="text"
            placeholder="Full Name"
            id="username"
            onChange={fnChng}
            className="lInput rounded  border-2 border-gray-200"
          />
          <input
            value={userName}
            type="text"
            placeholder="username"
            id="username"
            onChange={uChng}
            className="lInput rounded  border-2 border-gray-200"
          />
          <input
            value={country}
            type="text"
            placeholder="Country"
            id="username"
            onChange={cChng}
            className="lInput rounded  border-2 border-gray-200"
          />

          <button
            type="submit"
            className="bg-blue-400 rounded py-2"
            value={loading ? "Loading..." : "Submit"}
            style={{ cursor: loading ? "not-allowed" : "pointer" }}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
