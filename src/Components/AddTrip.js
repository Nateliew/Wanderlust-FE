import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { TextInput, Text, Button, Stack, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
  },

  input: {
    height: "auto",
    paddingTop: 18,
  },

  Text: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },
}));

export default function AddTrip({ user }) {
  const userId = 1;
  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState("");
  const [duration, setDuration] = useState(0);
  const [allCountries, setAllCountries] = useState([]);
  const { classes } = useStyles();

  const handleChange = (event) => {
    switch (event.target.name) {
      case "country":
        setCountry(event.target.value);
        break;
      case "startDate":
        setStartDate(event.target.value);
        break;
      case "endDate":
        setEndDate(event.target.value);
        break;
      default:
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    var date1 = new Date(endDate);
    var date2 = new Date(startDate);
    var diff = date1.getDate() - date2.getDate();
    console.log(diff);

    // Send request to create new listing in backend
    await axios
      .post(`${process.env.REACT_APP_API_SERVER}/trips`, {
        country,
        startDate,
        endDate,
        duration: diff,
        userId,
      })
      .then((res) => {
        // Clear form state
        setCountry("");
        setStartDate("");
        setEndDate("");
        setDuration(0);
        // Navigate to listing-specific page after submitting form
        navigate(`/home`);
      });
  };

  //extract country options here
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setAllCountries(response.data);
      console.log("country", response.data);
    });
    // Only run this effect on component mount
  }, []);

  return (
    <div>
      <Text>Add Trip</Text>
      <form onSubmit={handleSubmit} className="form">
        <Stack>
          <Text>Country</Text>
          <select
            name="country"
            value={country}
            onChange={handleChange}
            placeholder="Name of the Countries"
          >
            {allCountries.map((row, index) => (
              <option key={index} value={row?.name?.common}>
                {row?.name?.common}
              </option>
            ))}
          </select>
        </Stack>
        <br />
        <Stack>
          <Text>Start date</Text>
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={handleChange}
            placeholder="START"
          ></input>
        </Stack>
        <br />
        <Stack>
          <Text>End date</Text>
          <input
            type="date"
            name="endDate"
            value={endDate}
            onChange={handleChange}
            placeholder="END"
          />
        </Stack>
        <br />
        <Button variant="primary" type="submit">
          Add
        </Button>
      </form>
      <br />
      <Button onClick={() => navigate("/home")}>Back to Home</Button>
    </div>
  );
}
