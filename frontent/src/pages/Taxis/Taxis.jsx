import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { baseUrl } from "../../baseUrl";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";

const Taxis = () => {
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const datass = async () => {
      const res = await axios.get(`${baseUrl}/api/taxis`);
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
          serviceType: "Taxi", // Replace with the actual service type (e.g., hotel, photographer, etc.)
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
          title: "Taxi Booked",
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
      <Navbar />
      <Header />
      <div className="taxi">
        {data.map((t) => (
          <div className="custom-card" key={t._id}>
            <figure>
              <img
                className="img"
                src={t?.images[0] ? t.images[0] : "https://img.freepik.com/free-vector/taxi-poster-with-realistic-yellow-public-service-car-with-reflection_1284-5444.jpg"}

                alt="Taxi"
              />
            </figure>
            <div className="custom-card-body">
              <div className="body-title">
                <div>
                  <h2 className="custom-card-title">{t.carName}</h2>
                  <p className="desc">Capacity {t.maxCapacity} Person</p>
                  <p className="desc">Price: {t.pricePerKm} Per KM</p>
                </div>
                <div></div>
              </div>
              <div className="custom-card-actions ">
                <button
                  className="custom-btn btn px-4 bg-blue-400 rounded mt-20"
                  onClick={() => handleClick(t._id, t.pricePerKm)}
                >
                  Hire
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Taxis;
