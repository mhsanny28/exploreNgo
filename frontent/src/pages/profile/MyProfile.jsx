import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { baseUrl } from "../../baseUrl";
import Navbar from "../../components/navbar/Navbar";
const MyProfile = () => {
  const [data, setData] = useState(null);

  const { id } = useParams();

  console.log("idddddddddddd", id);

  useEffect(() => {
    const datass = async () => {
      const res = await axios.get(`${baseUrl}/api/user/${id}`);
      console.log("users data", res.data.message);
      setData(res.data.message);
    };
    datass();
  }, []);
  return (
    <div>
      <Navbar />

      <div className="login ">
        <div className="lContainer shadow-xl bg-white p-16  rounded-xl">
          <h1 className=" text-center font-bold text-lg">User Information</h1>
          <h2 className="  text-xl">Full Name: {data?.fullname}</h2>
          <h2 className="  text-xl">User Name: {data?.username}</h2>
          <h2 className="  text-xl">Email: {data?.email}</h2>
          <h2 className="  text-xl">Mobile Number: {data?.mobile}</h2>
          <h2 className="  text-xl">Country: {data?.country}</h2>

          <Link to={`/update/${id}`} className=" text-center mt-5">
            <button className=" bg-blue-500 hover:bg-blue-700 items-center text-center self-center text-white font-bold py-2 px-4 rounded">
              update info
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
