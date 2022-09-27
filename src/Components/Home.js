import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import TripsList from "./TripsList";
import { UserContext } from "../App";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Container } from "@mantine/core";
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
      <TripsList trips={trips} handleDelete={handleDelete} />
    </Container>
  );
}

export default Home;
