import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <p>Home</p>

      <ul>
        <Link to="/trips/1">
          <li>Trip 1</li>
        </Link>
        <Link to="/trips/2">
          <li>Trip 2</li>
        </Link>

        <Link to="/add-trip">
          <li>Add trip</li>
        </Link>
      </ul>
    </div>
  );
}
