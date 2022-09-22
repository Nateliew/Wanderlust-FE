import React, { useState, useEffect } from "react";
import {
  Link,
  useParams,
  useNavigate,
  NavLink,
  Outlet,
} from "react-router-dom";
import axios from "axios";
import Sidebar from "./CommentSidebar";
import PageTrip from "./Page";
// import Comments from "./Comments";
// import { Routes, Route } from "react-router-dom";

export default function TripDashboard() {
  // react routes
  const navigate = useNavigate();
  const params = useParams();
  const [trips, setTrips] = useState([]);
  const { tripId } = useParams();

  console.log(params);
  const getSingle = async () => {
    let singleTrip = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/trips/${params.tripId}`
    );
    setTrips(singleTrip.data);
  };

  useEffect(() => {
    getSingle();
  }, []);

  console.log(trips);
  console.log(params);

  return (
    <div>
      <p>Trip {Number(params.tripId)} Dashboard</p>
      {/* <Link
        style={{ display: "block", margin: "1rem 0" }}
        to={`/trips/${tripId}/comments`}
        key={tripId}
        tripId={tripId}
      >
        Comments{" "}
      </Link> */}
      {/* {trips
        .filter((trip) => Number(params.tripId) === Number(trip.id))
        .map((trip) => {
          return ( */}
      <div>
        {/* <p>{trip.country}</p>
              <p>{trip.startDate}</p>
              <p>{trip.duration}</p> */}
        {<PageTrip trip={trips} />}
      </div>
      {/* );
        })} */}
      {/* <button onClick={() => navigate("/home")}>Back to Home</button> */}
      <Sidebar />

      <Outlet />
    </div>
  );
}
