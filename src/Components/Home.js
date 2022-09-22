import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { BACKEND_URL } from "../constants";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import TripsList from "./TripsList";
import AddTrip from "./AddTrip";

export default function Home() {
  const [trips, setTrips] = useState([]);

  //user is here
  const userId = 1;

  //match the user id with trip id in user_trip table
  //get trip ID from user_trip table

  const getInitialData = async () => {
    let initialAPICall = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/trips/user/${userId}`
    );
    setTrips(initialAPICall.data);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  const handleDelete = async (index) => {
    console.log(index);
    await axios.delete(`http://localhost:3000/trips/${index}`);
  };

  console.log(trips);

  return (
    <div>
      <p>Home</p>
      <Link to="/home">
        {<TripsList trips={trips} handleDelete={handleDelete} />}
      </Link>
      <Link to="/add-trip">
        <li>Add trip</li>
      </Link>
      <Routes>
        <Route exact path="/add-trip" element={<AddTrip />}></Route>
      </Routes>
    </div>
  );
}
