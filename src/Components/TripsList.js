import React from "react";
import { Link } from "react-router-dom";
import Single from "./SingleTrip/Card";
import { useSearchParams, useNavigate } from "react-router-dom";
import { TextInput, Text } from "@mantine/core";
import "../App.css";

const TripsList = ({ trips, handleDelete }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  return (
    <div className="App">
      <div className="search">
        <Text className="searchButton">Search for your trip: </Text>
        <input
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
      </div>
      <br />
      <div>
        {trips
          .filter((trip) => {
            let filter = searchParams.get("filter");
            if (!filter) return true;
            let name = trip.country;
            return name === filter;
          })
          // .filter((trip) => trip.userId === user.id)
          .map((trip, index) => (
            <div key={index} className="container">
              <Link
                style={{
                  display: "inline-block",
                  margin: "1rem 0",
                  float: "left",
                  justifyContent: "space-between",
                  padding: "0rem 0.5rem",
                  textDecoration: "none",
                }}
                to={`/trips/${trip.id}`}
                key={index}
              >
                {<Single trip={trip} handleDelete={handleDelete} />}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TripsList;
