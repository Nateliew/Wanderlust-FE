import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { withAuthenticationRequired } from "@auth0/auth0-react";

// import for components
import Landing from "./Components/Landing";
import Home from "./Components/Home";
import AddTrip from "./Components/AddTrip";
import TripMenu from "./Components/TripMenu";
import TripDashboard from "./Components/TripDashboard";
import TripCalendar from "./Components/TripCalendar";
import TripWishlist from "./Components/TripWishlist";
// import PackingList from "./Components/PackingList";
import Comments from "./Components/Comments";
import TripPack from "./Components/TripPack/Packlist";
// import PackList from "./Components/TripPack/Packlist";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_DOMAIN}
    clientId={process.env.REACT_APP_CLIENTID}
    redirectUri={process.env.REACT_APP_REDIRECT_URI}
    audience={process.env.REACT_APP_AUDIENCE}
    scope={process.env.REACT_APP_SCOPE}
  >
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/" element={<App />}>
          <Route path="add-trip" element={<AddTrip />} />
          <Route path="home/*" element={<Home />} />
          <Route path="trips/:tripId" element={<TripMenu />}>
            <Route index element={<TripDashboard />} />
            <Route path="calendar" element={<TripCalendar />} />
            <Route path="wishlist" element={<TripWishlist />} />
            <Route path="comments" element={<Comments />} />
            <Route path="packinglist" element={<TripPack />} />
            {/* <Route path="packlist" element={<PackList />} /> */}
          </Route>

          <Route path="*" element={"Nothing here!"} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Auth0Provider>
);
