import React, { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  withAuthenticationRequired,
  useAuth0,
  Auth0Provider,
} from "@auth0/auth0-react";
import axios from "axios";

// import for components
import App from "../App";
import Landing from "./Landing";
import Home from "./Home";
import AddTrip from "./AddTrip";
import TripMenu from "./TripMenu";
import TripDashboard from "./TripDashboard";
import TripCalendar from "./TripCalendar";
import TripWishlist from "./TripWishlist";
// import PackingList from "./Components/PackingList";
import Comments from "./Comments";
import TripPack from "./TripPack/Packlist";

export const UserContext = createContext();

export default function AllRoutes() {
  const [userEmail, setUserEmail] = useState({});
  const [userName, setUserName] = useState({});
  const [userId, setUserId] = useState("");
  // const userId = useContext(userDatabaseId);

  const { user } = useAuth0();

  const getUserInfo = async () => {
    console.log("did this run?");
    console.log("user in allroutes", user);
    setUserEmail(user.email);
    setUserName(user.nickname);

    const userInfo = await axios.post(
      `${process.env.REACT_APP_API_SERVER}/users`,
      {
        name: user.nickname,
        email: user.email,
      }
    );

    setUserId(userInfo.data.id);
  };

  useEffect(() => {
    console.log("hello");
    getUserInfo();
  }, []);

  return (
    <Auth0Provider
      domain={process.env.REACT_APP_DOMAIN}
      clientId={process.env.REACT_APP_CLIENTID}
      redirectUri={process.env.REACT_APP_REDIRECT_URI}
      audience={process.env.REACT_APP_AUDIENCE}
      scope={process.env.REACT_APP_SCOPE}
    >
      <BrowserRouter>
        <UserContext.Provider value={userId}>
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
        </UserContext.Provider>
      </BrowserRouter>
    </Auth0Provider>
  );
}
