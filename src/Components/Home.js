import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import TripsList from "./TripsList";
import AddTrip from "./AddTrip";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../App";

function Home() {
  const [trips, setTrips] = useState([]);
  const [userEmail, setUserEmail] = useState({});
  const [userName, setUserName] = useState({});
  const userId = useContext(UserContext);

  // const { user } = useAuth0();

  //user is here
  // const userId = 1;

  //match the user id with trip id in user_trip table
  //get trip ID from user_trip table

  // upon login, we should check if the user exists in users model
  // findORcreate user's info

  // if user exists, then we show the list of trips

  // if user does not exist in model, we create userinfo and no trips data

  // const getUserInfo = async () => {
  //   setUserEmail(user.email);
  //   setUserName(user.nickname);

  //   const userInfo = await axios.post(
  //     `${process.env.REACT_APP_API_SERVER}/users`,
  //     {
  //       name: user.nickname,
  //       email: user.email,
  //     }
  //   );

  //   return userInfo.data.id;
  // };

  const getInitialData = async () => {
    axios
      .get(`${process.env.REACT_APP_API_SERVER}/trips/users/${userId}`)
      .then((response) => {
        console.log("response", response);
        setTrips(response.data);
      });
  };

  //ORIGINAL CODE WITH AUTHENTICATION ETC
  // const getInitialData = async () => {
  //   console.log("user", user);
  //   console.log("did this run??");

  //   const userId = getUserInfo();

  //   setUserEmail(user.email);
  //   setUserName(user.nickname);

  //   axios
  //     .post(`${process.env.REACT_APP_API_SERVER}/users`, {
  //       name: user.nickname,
  //       email: user.email,
  //     })
  //     .then((response) => response.data[0].id)
  //     .then((res) =>
  //       axios.get(`${process.env.REACT_APP_API_SERVER}/trips/users/${res}`)
  //     )
  //     .then((response) => {
  //       setTrips(response.data);
  //     });
  // };

  useEffect(() => {
    console.log("userIDDDDDD:", userId);
    getInitialData();
  }, [userId]);

  const handleDelete = async (index) => {
    console.log(index);
    await axios.delete(
      `${process.env.REACT_APP_API_SERVER}/trips/users/${index}`
    );
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

export default Home;
