import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div>
      <h3>Landing Page</h3>

      <button onClick={() => navigate("/home")}>Login</button>
    </div>
  );
}
