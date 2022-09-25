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

export default function TripDashboard() {
  // react routes
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

  return (
    <div>
      <p>Trip {Number(params.tripId)} Dashboard</p>
      <div>{<PageTrip trip={trips} />}</div>
      <Outlet />
    </div>
  );
}
