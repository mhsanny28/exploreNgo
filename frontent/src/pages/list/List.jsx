import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../baseUrl";
import Navbar from "../../components/navbar/Navbar";
import SearchItem from "../../components/searchItem/SearchItem";
import "./list.css";

const List = () => {
  //const location = useLocation();
  //const [destination, setDestination] = useState(location.state.destination);
  //const [dates, setDates] = useState(location.state.dates);
  const [destination, setDestination] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [rating, setRating] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  //const { data, loading, error, reFetch } = useFetch(
  //`/hotels?city=${destination}&min=${min || 0 }&max=${max || 999}`
  //);
  useEffect(() => {
    getHotelData();
  }, []);

  const getHotelData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/api/hotels`);
      console.log("hotel res-->", res.data.message);
      setData(res.data.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("hotel get error", error);
    }
  };

  const handleDesChng = (e) => {
    setDestination(e.target.value);
  };

  const handleName = (e) => {
    setHotelName(e.target.value);
  };
  const handleClick = async () => {
    //

    // Construct JSON data with non-empty values
    const searchData = {
      destination,
      hotelName,
      min: min !== 0 ? min : undefined, // Exclude 0 value
      max: max !== 0 ? max : undefined, // Exclude 0 value
      rating: rating !== 0 ? rating : undefined, // Exclude 0 value
    };

    // Log the JSON data to the console
    console.log("searchData -->", JSON.stringify(searchData, null, 2));


    try {
      setLoading(true);
      const searching = await axios.post(`${baseUrl}/api/search`, searchData)

      console.log("searhc result", searching.data);
      setData(searching.data.message)
      setLoading(false)
    } catch (error) {
      setLoading(false);
      console.log("Search error:", error);
    }

  };

  return (
    <div>
      <Navbar />

      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder="city" type="text" onChange={handleDesChng} />
            </div>{" "}
            <div className="lsItem">
              <label>Hotel Name</label>
              <input
                placeholder="Hotel Name"
                type="text"
                onChange={handleName}
              />
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">Rating</span>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    className="lsOptionInput"
                    onChange={(e) => setRating(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
