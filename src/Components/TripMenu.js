import React from "react";
import {
  Link,
  useParams,
  useNavigate,
  NavLink,
  Outlet,
} from "react-router-dom";
import Sidebar from "./Drawer";

export default function TripMenu() {
  // react routes
  const navigate = useNavigate();
  const params = useParams();

  return (
    <div>
      <div
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
          display: "flex",
          justifyContent: "space-around",
          fontSize: "16px",
        }}
      >
        <Link to="dashboard">Dashboard</Link>
        {/* <Link to="calendar">Calendar</Link>
        <Link to="wishlist">Wishlist </Link> */}
        <Link to="packinglist">Packing List</Link>

        <a href="#/">Add friend</a>
        <a href="#/">Discussion</a>
        <button onClick={() => navigate("/home")}>Back to Home</button>
      </div>
      <Sidebar />
      <Outlet />
    </div>
  );
}
