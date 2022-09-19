import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TripsList = ({ trips, handleDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="App">
      <div className="App-header">
        {trips
          // .filter((trip) => trip.userId === user.id)
          .map((trip, index) => (
            <div className="container">
              <Link
                style={{ display: "block", margin: "1rem 0" }}
                to={`/trips/${index}`}
                key={trip.id}
              >
                <div>
                  {trip.country}
                  <br />
                  {trip.startDate}
                  <br />
                </div>
              </Link>
              <button onClick={(e) => handleDelete(trip.id)} type="button">
                Delete
              </button>{" "}
              <button onClick={(e) => navigate("/home")}>Click here</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TripsList;
