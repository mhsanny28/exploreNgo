import {
  faLocationDot
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { baseUrl } from "../../baseUrl";
import { AuthContext } from "../../context/AuthContext";
import { SearchContext } from "../../context/SearchContext";
import "./hotel.css";

import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../../components/navbar/Navbar";
const Hotel = () => {
  // const location = useLocation();
  // const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { id } = useParams();
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  console.log("Hotel ID:", id);

  // const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  useEffect(() => {
    getHotelData();
  }, []);

  const getHotelData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/api/hotel/${id}`);
      console.log("single hotel res-->", res.data.message);
      setData(res.data.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("hotel get error", error);
    }
  };
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  // Ensure dates is defined and has the expected structure before using its properties
  const days =
    dates?.[0]?.endDate && dates?.[0]?.startDate
      ? dayDifference(dates[0].endDate, dates[0].startDate)
      : 0;

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = async () => {
    console.log("user -->", user);
    if (user) {
      try {
        const orderData = {
          user: user._id, // Replace with the actual user ID
          serviceType: "Hotel", // Replace with the actual service type (e.g., hotel, photographer, etc.)
          serviceId: id, // Replace with the actual service ID
          startDate: startDate, // Replace with the actual start date
          endDate: endDate, // Replace with the actual end date
          totalPrice: data.price, // Replace with the actual total price
          // Optionally, you can include payment and orderStatus here as well
        };

        const response = await axios.post(
          `${baseUrl}/api/order/create`,
          orderData
        );
        console.log("Order created:", response.data);
        Swal.fire({
          icon: "success",
          title: "Hotel Booked",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(`/myBookings`);

        // Handle success - do something with the response data if needed
      } catch (error) {
        console.error(
          "Error creating order:",
          error.response ? error.response.data : error.message
        );
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data,
        });
        // Handle error - log error details or display an error message to the user
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <>








<Navbar/>



      <div className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <img
                  className="w-full h-full object-cover"
                  src={data && data.images && data?.images[0]}
                  alt="Product"
                />
              </div>

              <div className="flex -mx-2 mb-4">
                <div className="w-1/2 px-2">
                  <button onClick={handleClick} className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                    Book Now
                  </button>
                </div>

              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {data.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                <FontAwesomeIcon icon={faLocationDot} /> {""}
                <span>{data.city}</span>
              </p>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Price Per Night:
                  </span>
                  {" "}
                  <span className="text-gray-600 dark:text-gray-300">
                     ${data.price}
                  </span>
                </div>

              </div>

              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Hotel Description:
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  {data.desc}
                </p>
              </div>
      
              {/* <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Select Room:
                </span>
                <div className="flex items-center mt-2">
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    S
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    M
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    L
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    XL
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    XXL
                  </button>
                </div>
              </div> */}

              <div className="mt-10" >
                  <p className="text-lg text-white">Choose Check in Date:</p>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />

                  <p className="mt-9 text-lg text-white">
                    Choose Check Out Date:
                  </p>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                  />

                </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hotel;
