import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import for components
import Home from "./Components/Home";
import AddTrip from "./Components/AddTrip";
import TripDashboard from "./Components/TripDashboard";
import TripCalendar from "./Components/TripCalendar";
import TripWishlist from "./Components/TripWishlist";
import PackingList from "./Components/PackingList";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="home/*" element={<Home />} />
        <Route path="add-trip" element={<AddTrip />} />
        <Route path="trips/:tripId" element={<TripDashboard />}>
          <Route path="calendar" element={<TripCalendar />} />
          <Route path="wishlist" element={<TripWishlist />} />
          <Route path="packinglist" element={<PackingList />} />
        </Route>

        <Route path="*" element={"Nothing here!"} />
      </Route>
    </Routes>
  </BrowserRouter>
);
