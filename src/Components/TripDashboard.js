import React from "react";
import {
  Link,
  useParams,
  useNavigate,
  NavLink,
  Outlet,
} from "react-router-dom";

export default function TripDashboard() {
  // react routes
  const navigate = useNavigate();
  const params = useParams();

  return (
    <div>
      <p>Trip {params.tripId} Dashboard</p>
      <div
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
          display: "flex",
          justifyContent: "space-around",
          fontSize: "16px",
        }}
      >
        <Link to="calendar">Calendar | </Link>
        <Link to="wishlist">Wishlist | </Link>
        <Link to="packinglist">Packing List |</Link>
        <a href="">Add friend</a>
      </div>
      <button onClick={() => navigate("/home")}>Back to Home</button>
      <Outlet />
    </div>
  );
}
