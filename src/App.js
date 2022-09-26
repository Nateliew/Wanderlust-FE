import "./App.css";
import axios from "axios";
import { useState, useEffect, createContext } from "react";
// for testing frontend
import { Outlet, useNavigate, Link } from "react-router-dom";
// for styling

import {
  IconGlobe,
  IconCalendar,
  IconListDetails,
  IconMessage2,
  IconBackpack,
  IconFriends,
} from "@tabler/icons";

import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";

import {
  MantineProvider,
  AppShell,
  Navbar,
  Header,
  Text,
  Burger,
  useMantineTheme,
  ActionIcon,
  ColorSchemeProvider,
  Title,
  createStyles,
  Group,
  NavLink,
} from "@mantine/core";
import { IconSun, IconMoonStars, IconLogout, IconHome } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  navbar: {
    [theme.fn.largerThan("xl")]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
}));

export const UserContext = createContext();

function App() {
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const [colorScheme, setColorScheme] = useState("light");
  const [userId, setUserId] = useState("");
  const { classes } = useStyles();
  const [trips, setTrips] = useState([]);

  const getInitialData = async () => {
    axios
      .get(`${process.env.REACT_APP_API_SERVER}/trips/users/${userId}`)
      .then((response) => {
        console.log("response", response);
        setTrips(response.data);
      });
  };

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  const { user, logout } = useAuth0();

  const getUserInfo = async () => {
    const userInfo = await axios.post(
      `${process.env.REACT_APP_API_SERVER}/users`,
      {
        name: user.nickname,
        email: user.email,
      }
    );
    setUserId(userInfo.data[0].id);
    const tripsInfo = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/trips/users/${userInfo.data[0].id}`
    );
    setTrips(tripsInfo.data);
  };

  const getAllTrips = async () => {};

  useEffect(() => {
    getUserInfo();
  }, []);

  const renderNavlinks = trips.map((trip, index) => (
    <NavLink label={trip.country} key={index}>
      <NavLink
        icon={<IconGlobe size={14} />}
        label="Dashboard"
        onClick={() => {
          navigate(`trips/${trip.id}`);
          setOpened(!opened);
        }}
      />

      <NavLink
        icon={<IconCalendar size={14} />}
        onClick={() => {
          navigate(`trips/${trip.id}/calendar`);
          setOpened(!opened);
        }}
        label="Calendar"
      />
      <NavLink
        icon={<IconListDetails size={14} />}
        onClick={() => {
          navigate(`trips/${trip.id}/wishlist`);
          setOpened(!opened);
        }}
        label="Wishlist"
      />
      <NavLink
        icon={<IconBackpack size={14} />}
        onClick={() => {
          navigate(`trips/${trip.id}/packinglist`);
          setOpened(!opened);
        }}
        label="Packing List"
      />
      <NavLink
        icon={<IconFriends size={14} />}
        onClick={() => {
          navigate(`trips/${trip.id}/addfriend`);
          setOpened(!opened);
        }}
        label="Add Friend"
      />
    </NavLink>
  ));

  return (
    <UserContext.Provider value={userId}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            fontFamily: "Raleway, sans-serif",
            headings: {
              fontFamily: "Vollkorn, serif",
            },
          }}
        >
          <AppShell
            styles={{
              main: {
                background:
                  theme.colorScheme === "light"
                    ? theme.colors.gray[0]
                    : theme.colors.dark[8],
              },
            }}
            navbarOffsetBreakpoint="2000"
            navbar={
              <Navbar
                width={{ base: 300 }}
                hidden={!opened}
                hiddenBreakpoint="1900"
                p="md"
                sx={{ backgroundColor: theme.colors.blue[0] }}
              >
                {renderNavlinks}
              </Navbar>
              // <Drawer
              //   opened={opened}
              //   onClose={() => setOpened(false)}
              //   // hidden={!opened}
              //   // width={{ base: 300 }}
              //   height="100vh"
              //   p="0"
              // >
              //   {/* Navbar content */}
              //   <NavbarSimpleColored />
              // </Drawer>
            }
            // navbar={
            //   <Navbar hidden={!opened} className={classes.navbar}>
            //     <Anchor>Home</Anchor>
            //     <Anchor>Trips</Anchor>
            //     <Anchor></Anchor>
            //   </Navbar>
            // }
            header={
              <Header
                height={70}
                p="md"
                sx={{ backgroundColor: theme.colors.blue[3] }}
              >
                <div
                  style={{
                    display: "flex",
                    height: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Group>
                    <Burger
                      opened={opened}
                      onClick={() => setOpened((o) => !o)}
                      size="sm"
                      color={theme.colors.gray[9]}
                      // mr="sm"
                    />
                    <ActionIcon
                      variant="filled"
                      color={theme.colors.gray[9]}
                      onClick={() => navigate("/home")}
                      title="Toggle color scheme"
                      className="actionIcon"
                    >
                      <IconHome size={18} />
                    </ActionIcon>
                  </Group>

                  <Title italic order={2} sx={{ color: theme.colors.gray[9] }}>
                    WanderlustBWA
                  </Title>
                  <Group>
                    <ActionIcon
                      variant="filled"
                      color={theme.colors.gray[9]}
                      onClick={() => toggleColorScheme()}
                      title="Toggle color scheme"
                      className="actionIcon"
                    >
                      {colorScheme === "dark" ? (
                        <IconSun size={18} />
                      ) : (
                        <IconMoonStars size={18} />
                      )}
                    </ActionIcon>

                    <ActionIcon
                      onClick={() => {
                        logout({ returnTo: window.location.origin });
                      }}
                      variant="filled"
                      color={theme.colors.gray[9]}
                      className="actionIcon"
                    >
                      <IconLogout size={18} />
                    </ActionIcon>
                  </Group>
                </div>
              </Header>
            }
          >
            <Text></Text>
            <Outlet />
          </AppShell>
        </MantineProvider>
      </ColorSchemeProvider>
    </UserContext.Provider>
  );
}

// export default App;

export default withAuthenticationRequired(App, {
  onRedirecting: () => <div>Redirecting you to the login page...</div>,
});
