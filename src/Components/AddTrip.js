import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { UserContext } from "../App";
// import { button } from "@elastic/eui";

export default function AddTrip({ user }) {
  const userId = useContext(UserContext);
  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [duration, setDuration] = useState(0);
  const [allCountries, setAllCountries] = useState([]);

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

    console.log("USERIDDDDDDDDD IN ADDTRIP: ", userId);

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
      <p>Add Trip</p>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label>Country</label>
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
        </div>
        <div>
          <label>Start date</label>
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={handleChange}
            placeholder="START"
          ></input>
        </div>
        <div>
          <label>End date</label>
          <input
            type="date"
            name="endDate"
            value={endDate}
            onChange={handleChange}
            placeholder="END"
          />
        </div>
        <button variant="primary" type="submit">
          Add
        </button>
      </form>
      <br />
      <button onClick={() => navigate("/home")}>Back to Home</button>
    </div>
  );
}
