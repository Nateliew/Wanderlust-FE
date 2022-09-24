import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import TripsList from "./TripsList";
import AddTrip from "./AddTrip";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const [trips, setTrips] = useState([]);
  const [userList, setUserList] = useState([]);

  // const getUser = () => {
  //   // Sending HTTP GET request
  //   const accessToken = getAccessTokenSilently({
  //     audience: process.env.REACT_APP_AUDIENCE,
  //     scope: process.env.REACT_APP_SCOPE,
  //   });
  //   axios
  //     .get(`${process.env.REACT_APP_API_SERVER}/users`, {
  //       headers: {
  //         Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlN0OTR6LXRNemlCSHU1WXBrMnllOCJ9.eyJpc3MiOiJodHRwczovL2Rldi1vd3JtZXFjby51cy5hdXRoMC5jb20vIiwic3ViIjoiVTNDRWxwVmVtU0VuZWpGdWZyMEtRTlBzOFZKR25pTjRAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vdHJhdmVsL2FwaSIsImlhdCI6MTY2MzkzNTM5NCwiZXhwIjoxNjY0MDIxNzk0LCJhenAiOiJVM0NFbHBWZW1TRW5lakZ1ZnIwS1FOUHM4VkpHbmlONCIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.Fc_WhBM3zQI_RCtdNVKYn9kz4kf7YWbjKyTS89L_LvMgjhhRs9PCK52bwswHV6Zrj_kja0LPyGC5mG06wUnXpy1OiOoW1M0w_PTqO8OijPVwe1LZ1z2x6-c5YDx7xO-WJZbzg_BVHnrG2RWEAWocPFA39tewP4wFLtGY2c46J6vGaXxBO_uu7Z7JWp_NRPmTSpeTeyqmgGtXQVINAPQS6KZ5Km1dYaTZy90afvrRc9SCWyifSSeeB0olN1Mc8kRvmPEfv5SmbWhjTfMusPXobGUr9i5oN-i8QBGMfmubzHjyD2Tsn-_EPLv937C5CXy6HmAS1ZSNWRAAZFWEdl0UFg`,
  //       },
  //     })
  //     .catch((error) => {})
  //     .then((response) => {
  //       const userNames = response.data.map((res) => res.name);
  //       setUserList(userNames);
  //     });
  // };

  const { loginWithRedirect, user, isAuthenticated, getAccessTokenSilently } =
    useAuth0();

  //user is here
  const userId = 1;

  useEffect(() => {
    // If there is a user, retrieve the trip data
    if (user) {
      const getToken = async () => {
        const accessToken = await getAccessTokenSilently({
          audience: "https://travel/api",
          scope: "read write",
        });
        console.log(accessToken);
        return accessToken;
      };
      const newToken = getToken();
      const fetchUser = async () => {
        const response = axios
          .get(`${process.env.REACT_APP_API_SERVER}/users`)
          .then((response) => {
            setUserList(response.data);
          });
      };
      fetchUser();

      axios
        .get(`${process.env.REACT_APP_API_SERVER}/users`)
        .then((response) => {
          setUserList(response.data);
        });
      // console.log("newToken", newToken);
    } else loginWithRedirect();
  }, []);

  useEffect(() => {
    // If there is a user, retrieve the trip data
    if (user) {
      axios
        .get(`${process.env.REACT_APP_API_SERVER}/users`)
        .then((response) => {
          setUserList(response.data);
        });
    }
  }, []);

  let containName = userList.some((name) => name.name === user.name);
  console.log(containName);
  useEffect(() => {
    console.log("inside useEffect");
    if (isAuthenticated) {
      console.log("Auth");
      //check to see if the list of users contains the name of the user
      if (containName) {
        console.log("Whatever");
        const getToken = async () => {
          const accessToken = await getAccessTokenSilently({
            audience: "https://travel/api",
            scope: "read write",
          });
          console.log(accessToken);
          return accessToken;
        };
        const newToken = getToken();
        axios.get(`${process.env.REACT_APP_API_SERVER}/trips/users/${userId}`, {
          headers: {
            authorization: `Bearer ${newToken}`,
          },
        });
      }
      //else post user to database
      else {
        const getToken = async () => {
          const accessToken = await getAccessTokenSilently({
            audience: "https://travel/api",
            scope: "read write",
          });
          console.log(accessToken);
          return accessToken;
        };
        const newToken = getToken();
        const postData = async () => {
          try {
            const resp = await axios
              .post(
                `${process.env.REACT_APP_API_SERVER}/users`,
                {
                  firstName: user.nickname,
                  lastName: user.nickname,
                  email: user.email,
                },
                {
                  headers: {
                    Authorization: `Bearer ${newToken}`,
                  },
                }
              )
              .then((response) => {
                console.log("reponse", response);
              });
            console.log(resp.data);
          } catch (err) {
            // Handle Error Here
            console.error(err);
          }
        };
        postData();
      }
    } else loginWithRedirect();
  }, []);

  const handleDelete = async (index) => {
    console.log(index);
    await axios.delete(`${process.env.REACT_APP_API_SERVER}/trips/${index}`);
  };

  console.log(trips);

  return (
    <div>
      <Link to="/add-trip">
        <li>Add trip</li>
      </Link>
      <div>
        <Link to="/home">
          {<TripsList trips={trips} handleDelete={handleDelete} />}
        </Link>
      </div>
      <Routes>
        <Route exact path="/add-trip" element={<AddTrip />}></Route>
      </Routes>
    </div>
  );
}
