import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import for components
import Landing from "./Components/Landing";
import Home from "./Components/Home";
import AddTrip from "./Components/AddTrip";
import TripMenu from "./Components/TripMenu";
import TripDashboard from "./Components/TripDashboard";
import TripCalendar from "./Components/TripCalendar";
import TripWishlist from "./Components/TripWishlist";
import TripPack from "./Components/TripPack/AllPack";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Landing />} />
      <Route path="/" element={<App />}>
        <Route path="add-trip" element={<AddTrip />} />
        <Route path="home" element={<Home />} />
        <Route path="trips/:tripId" element={<TripMenu />}>
          <Route index element={<TripDashboard />} />
          <Route path="calendar" element={<TripCalendar />} />
          <Route path="wishlist" element={<TripWishlist />} />
          <Route path="packinglist" element={<TripPack />} />
        </Route>

        <Route path="*" element={"Nothing here!"} />
      </Route>
    </Routes>
  </BrowserRouter>
);
