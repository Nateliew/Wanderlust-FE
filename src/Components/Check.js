const getInitialDatas = async () => {
  console.log("user", user);
  console.log("did this run??");
  if (isAuthenticated) {
    if (userExist.includes(user.name.trim())) {
      console.log("already existed");
      setUserInfo(user);

      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUDIENCE,
        scope: process.env.REACT_APP_SCOPE,
      });

      axios
        .get(`${process.env.REACT_APP_API_SERVER}/trips/users/${userId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })

        .then((response) => {
          setTrips(response.data);
        });
    } else {
      console.log("user:", user);
      console.log("ORRRRR did this run??");
      loginWithRedirect();
      // post to backend /users to store the user info
    }
  } else {
    console.log("doesnt exist");
    axios
      .post(`${process.env.REACT_APP_API_SERVER}/users/`, {
        // Sending HTTP POST request
        firstName: user.nickname,
        lastName: user.nickname,
        email: user.email,
      })
      .then((res) => {
        console.log("User has been posted");
      });
  }
};

useEffect(() => {
  getInitialData();
}, []);

//first load the user data from the database

// check authentication
// if authenticated, check to see if user exists
// else post the user
// if not authenticated, redirect
//

//Step 1. Get all the user data
useEffect(() => {
  // If there is a user, retrieve the trip data
  if (user) {
    axios.get(`${process.env.REACT_APP_API_SERVER}/users`).then((response) => {
      setUserList(response.data);
    });
  }
}, []);

useEffect(() => {
  if (isAuthenticated) {
    console.log(user);

    //Check to see if curr user exists
    if (userList.includes(user.name.trim())) {
      console.log("already existed");

      //if user exists
      //Set user as current user
      //Check if user exists
      //Get the userId
      // Get the data from db
      axios.get(`${process.env.REACT_APP_API_SERVER}/trips/users/${userId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    }

    //else post user to database
    else {
      const accessToken = getAccessTokenSilently({
        audience: process.env.REACT_APP_AUDIENCE,
        scope: process.env.REACT_APP_SCOPE,
      });
      //MAYBE ADD THE USER INFO HERE/INCLUDE LOGGED IN USER
      axios
        .post(
          `${process.env.REACT_APP_API_SERVER}/users`,
          {
            firstName: user.nickname,
            lastName: user.nickname,
            email: user.email,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          console.log("reponse", response);
        });
    }
  } else loginWithRedirect();
}, []);

//async await
