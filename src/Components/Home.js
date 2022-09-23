import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import TripsList from "./TripsList";
import AddTrip from "./AddTrip";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const [trips, setTrips] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  const {
    loginWithRedirect,
    user,
    isAuthenticated,
    getAccessTokenSilently,
    logout,
  } = useAuth0();

  //user is here
  const userId = 1;

  //match the user id with trip id in user_trip table
  //get trip ID from user_trip table

  const getInitialData = async () => {
    console.log("user", user);
    console.log("did this run??");
    if (isAuthenticated) {
      setUserInfo(user);

      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUDIENCE,
        scope: process.env.REACT_APP_SCOPE,
      });

      axios
        .get(`${process.env.REACT_APP_API_SERVER}/trips/users/${userId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })

        .then((response) => {
          setTrips(response.data);
        });
    } else {
      console.log("user:", user);
      console.log("ORRRRR did this run??");
      loginWithRedirect();
      // post to backend /users to store the user info
    }
  };

  useEffect(() => {
    getInitialData();
  }, []);

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

// export default withAuthenticationRequired(Home);
