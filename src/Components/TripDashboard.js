import React, { useState, useEffect } from "react";
import {
  Link,
  useParams,
  useNavigate,
  NavLink,
  Outlet,
} from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../constant";

export default function TripDashboard() {
  // react routes
  const navigate = useNavigate();
  const params = useParams();
  const [trips, setTrips] = useState([]);
  const { tripId } = useParams();

  const getSingle = async () => {
    let singleTrip = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/trips`
    );
    setTrips(singleTrip.data);
  };

  useEffect(() => {
    getSingle();
  }, []);

  console.log(trips);

  return (
    <div>
      <p>Trip {Number(params.tripId) + 1} Dashboard</p>
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
      {trips
        .filter((trip) => Number(params.tripId) + 1 === Number(trip.id))
        .map((trip) => {
          return (
            <div>
              <p>{trip.country}</p>
              <p>{trip.startDate}</p>
              <p>{trip.duration}</p>
            </div>
          );
        })}
      <button onClick={() => navigate("/home")}>Back to Home</button>
      <Outlet />
    </div>
  );
}
