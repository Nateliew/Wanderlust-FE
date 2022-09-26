import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import TripsList from "./TripsList";
import AddTrip from "./AddTrip";
import { UserContext } from "../App";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Container, Box } from "@mantine/core";
import { IconMapPins } from "@tabler/icons";

function Home() {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

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
    if (userId !== "") {
      getInitialData();
    }
  }, [userId]);

  const handleDelete = async (index, event) => {
    console.log(index);
    await axios.delete(`${process.env.REACT_APP_API_SERVER}/trips/${index}`);
    event.preventDefault();
  };

  console.log(trips);

  return (
    <Container>
      <Button
        mb="2rem"
        leftIcon={<IconMapPins />}
        onClick={() => navigate("/add-trip")}
      >
        Add New Trip
      </Button>
      <br />
      {/* <div> */}
      {/* <Link to="/home"> */}
      <TripsList trips={trips} handleDelete={handleDelete} />
      {/* </Link> */}
      {/* </div>
      <Routes>
        <Route exact path="/add-trip" element={<AddTrip />}></Route>
      </Routes> */}
      {/* <Link to="/add-trip" className="addButton"> */}
    </Container>
  );
}

export default Home;
