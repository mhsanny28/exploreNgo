import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { baseUrl } from "../../baseUrl";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";

const Package = () => {
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const datass = async () => {
      const res = await axios.get(`${baseUrl}/api/packs`);
      console.log("photos", res);
      setData(res.data);
    };
    datass();
  }, []);

  const handleClick = async (id, price) => {
    console.log("user -->", user);
    if (user) {
      try {
        const orderData = {
          user: user._id, // Replace with the actual user ID
          serviceType: "Package", // Replace with the actual service type (e.g., hotel, photographer, etc.)
          serviceId: id, // Replace with the actual service ID
          // startDate:startDate, // Replace with the actual start date
          // endDate: endDate, // Replace with the actual end date
          totalPrice: price, // Replace with the actual total price
          // Optionally, you can include payment and orderStatus here as well
        };

        const response = await axios.post(
          `${baseUrl}/api/order/create`,
          orderData
        );
        console.log("Order created:", response.data);
        // Handle success - do something with the response data if needed
        Swal.fire({
          icon: "success",
          title: "Package Booked",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(`/myBookings`);
      } catch (error) {
        console.error(
          "Error creating order:",
          error.response ? error.response.data : error.message
        );
        // Handle error - log error details or display an error message to the user
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data,
        });
      }
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      <div>
        <Navbar />
        <Header />
        <div className="">
          <div className="flex items-center justify-center min-h-screen px-4 md:px-8 lg:px-16 xl:px-32 flex-wrap">
            {data.map((pp) => (
              <div
                key={pp._id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-2 mb-4"
              >
                <div className=" space-y-6 my-20 px-10">
                  <div className="w-full h-full flex flex-col p-4 bg-black/40 rounded-lg">
                    <img
                    src={pp?.images[0] ? pp.images[0] : "https://i.scdn.co/image/ab67616d0000b2739e3f258987afca1e41440fb5"}                      
                      alt="pack"
                    />
                    <h1 className="font-bold text-lg text-white mt-3">
                      {" "}
                      {pp.packageName ? pp.packageName: "Buy Package to save money"}
                    </h1>
                    <h2 className="font-semibold text-lg text-white mt-3">
                      Hotel
                    </h2>
                    <p className="font-semibold text-sm text-gray-200">
                      {pp.hotel?.name}
                    </p>
                    <a
                      className="font-semibold text-sm text-white bg-slate-400 mt-3"
                      href={`http://localhost:3000/hotels/${pp.hotel?._id}`}
                    >
                      View this hotel
                    </a>
                    <br />
                    <h2 className="font-semibold text-lg text-white mt-3">
                      Taxi
                    </h2>
                    <p className="font-semibold text-sm text-gray-200">
                      {pp.taxi?.carName}
                    </p>

                    <h2 className="font-semibold text-lg text-white mt-3">
                      PhotoGrapher
                    </h2>
                    <p className="font-semibold text-sm text-gray-200">
                      {pp.photographer?.name}
                    </p>

                    <p className="font-semibold text-sm text-gray-200">
                      Camera Model: {pp.photographer?.cameraModel}
                    </p>

                    <p className="mt-2 font-bold">Package Price: {pp.price}</p>

                    <button
                      type="submit"
                      onClick={() => handleClick(pp._id, pp.price)}
                      className="btn px-4 bg-blue-400 rounded mt-20"
                    >
                      Buy This Package
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Package;
