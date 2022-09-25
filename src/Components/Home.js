import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import TripsList from "./TripsList";
import AddTrip from "./AddTrip";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../App";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

function Home() {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  // const [userEmail, setUserEmail] = useState({});
  // const [userName, setUserName] = useState({});
  const userId = useContext(UserContext);

  const getInitialData = async () => {
    axios
      .get(`${process.env.REACT_APP_API_SERVER}/trips/users/${userId}`)
      .then((response) => {
        console.log("response", response);
        setTrips(response.data);
      });
  };

  useEffect(() => {
    console.log("userIDDDDDD:", userId);
    getInitialData();
  }, [userId]);

  const handleDelete = async (index, event) => {
    console.log(index);
    await axios.delete(`${process.env.REACT_APP_API_SERVER}/trips/${index}`);
    event.preventDefault();
  };

  console.log(trips);

  return (
    <div>
      <Link to="/add-trip" className="addButton">
        <Button>+</Button>
      </Link>
      <div>
        <Link to="/home">
          {<TripsList trips={trips} handleDelete={handleDelete} />}
        </Link>
      </div>
      <Routes>
        <Route exact path="/add-trip" element={<AddTrip />}></Route>
      </Routes>
    </div>
  );
}

export default Home;
