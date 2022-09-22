import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddTrip() {
  const navigate = useNavigate();

  return (
    <div>
      <p>Add Trip</p>

      <button onClick={() => navigate("/home")}>Back to Home</button>
    </div>
  );
}
