import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constant";
import axios from "axios";
import "../App.css";
// import { button } from "@elastic/eui";

export default function AddTrip({ user }) {
  const userId = 1;
  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState("");
  const [duration, setDuration] = useState(0);
  const [currUser, setCurrUser] = useState();

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
      case "duration":
        setDuration(event.target.value);
        break;
      default:
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send request to create new listing in backend
    axios
      .post(`${BACKEND_URL}/trips`, {
        country,
        startDate,
        endDate,
        duration,
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

  return (
    <div>
      <p>Add Trip</p>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label>Country</label>
          <input
            type="text"
            name="country"
            value={country}
            onChange={handleChange}
            placeholder="Name of the Countries"
          />
        </div>
        <div>
          <label>Start date</label>
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={handleChange}
            placeholder="START"
          />
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
        <div>
          <label>Duration</label>
          <input
            type="text"
            name="duration"
            value={duration}
            onChange={handleChange}
            placeholder="10"
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
