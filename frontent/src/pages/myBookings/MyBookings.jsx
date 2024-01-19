import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../../baseUrl";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";


const MyBookings = () => {

  const [data, setData] = useState([]);
  const location = useLocation();
  const { user } = useContext(AuthContext);

  console.log('user', user);

  useEffect(() => {
    const datass = async () => {
      const res = await axios.get(`${baseUrl}/api/order/${user._id}`);
      console.log("taxi", res);
      setData(res.data);
    };
    datass();
  }, []);


  const handleDlt = (id) => {
    try {
      axios.delete(`${baseUrl}/api/order/${id}`);
      setData(data.filter((item) => item.id !== id));
      console.log(`deleted room ${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 410,
      renderCell: (param) => <div className="userr">{param.row._id}</div>,
    },
    {
      field: "orderType",
      headerName: "Order Type",
      width: 140,
      style: { color: "red" },
      renderCell: (param) => <div className="userr">{param.row.serviceType}</div>,
    },
    {
      field: "start Date",
      headerName: "start Date",
      width: 240,
      renderCell: (param) => (
        <div className="userr">{param.row.startDate}</div>
      ),
    },
    {
        field: "End Date",
        headerName: "End Date",
        width: 240,
        renderCell: (param) => (
          <div className="userr">{param.row.endDate}</div>
        ),
      },
    {
      field: "totalPrice",
      headerName: "totalPrice",
      width: 240,
      renderCell: (param) => (
        <div className="userr">{param.row.totalPrice}</div>
      ),
    },
    {
      field: "payment",
      headerName: "Payment",
      width: 140,
      style: { color: "red" },
      renderCell: (param) => (
        <div
          style={{
            color: param.row.payment === "due" ? "red" : "green",
          }}
          className="userr"
        >
          {param.row.payment}
        </div>
      ),
    },
    {
      field: "orderStatus",
      headerName: "Order Status",
      width: 140,
      style: { color: "red" },
      renderCell: (param) => (
        <div
          style={{
            color: param.row.orderStatus === "pending" ? "red" : "green",
          }}
          className="userr"
        >
          {param.row.orderStatus}
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 360,
      renderCell: (params) => (
        <div className="actionn">
           

           {params.row.orderStatus !== "approved" && (
          <button
            type="button"
            style={{
              padding: "5px 12px",
              cursor: "pointer",
              borderRadius: "4px",
              color: "red",
              border: "1px solid red",
              background: "none",
              marginRight: "10px",
            }}
            className="delete_btn"
            onClick={() => handleDlt(params.row._id)}
          >
            Cancel
          </button>
          )}

        </div>
      ),
    },
  ]
  return (
    <div>
      <Navbar />

      <h1 style={{textAign: 'center',margin: '50px',fontSize: '26px', fontWeight: 'bold',color: 'blue'}}>My Order History</h1>

      <div className="room_page_table">
          <DataGrid
            className="data_grid"
            rows={data}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            getRowId={(row) => row._id}
          />
        </div>
     
    </div>
  );
};

export default MyBookings;
