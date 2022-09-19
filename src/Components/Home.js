import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { BACKEND_URL } from "../constants";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import TripsList from "./TripsList";
import AddTrip from "./AddTrip";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [trips, setTrips] = useState([]);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const getInitialData = async () => {
    let initialAPICall = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/trips`
    );
    setTrips(initialAPICall.data);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  const getUser = async () => {
    let initialUser = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/users`
    );
    setUser(initialUser.data);
  };

  useEffect(() => {
    getUser();
  }, [trips]);

  console.log(user);

  const handleDelete = async (index) => {
    console.log(index);
    await axios.delete(`http://localhost:3000/trips/${index}`);

    navigate("/home");

    // return false;
    // const response = await axios.delete(`http://localhost:3000/trips/${index}`);
    // console.log(response);
    // if (response.data.message) {
    //   setTrips(response.data.message);
    // }
  };

  return (
    <div>
      <p>Home</p>
      <Link to="/">
        {<TripsList trips={trips} handleDelete={handleDelete} />}
      </Link>
      <Link to="/add-trip">
        <li>Add trip</li>
      </Link>
      <Routes>
        <Route exact path="/add-trip" element={<AddTrip user={user} />}></Route>
      </Routes>
    </div>
  );
}
