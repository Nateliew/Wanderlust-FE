import React from "react";
import { Link } from "react-router-dom";
import Single from "./Card";

const TripsList = ({ trips, handleDelete }) => {
  return (
    <div className="App">
      {trips
        // .filter((trip) => trip.userId === user.id)
        .map((trip, index) => (
          <div className="container">
            <Link
              style={{ display: "block", margin: "1rem 0" }}
              to={`/trips/${trip.id}`}
              key={index}
            >
              <div>{<Single trip={trip} />}</div>
            </Link>
            {/* <button onClick={(e) => handleDelete(trip.id)} type="button">
              Delete
            </button>{" "} */}
          </div>
        ))}
    </div>
  );
};

export default TripsList;
