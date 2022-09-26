import "./App.css";
import axios from "axios";
import { useState, useEffect, createContext, useContext } from "react";
// for testing frontend
import { Outlet, useNavigate, Link } from "react-router-dom";
// for styling
import { bwaTheme } from "./Styling/Theme";

import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";

import {
  MantineProvider,
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  Burger,
  useMantineTheme,
  ActionIcon,
  ColorSchemeProvider,
  Title,
  Button,
  Anchor,
  createStyles,
  Container,
  Drawer,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons";
import LogoutButton from "./Components/Logout";

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
  };

  useEffect(() => {
    getUserInfo();
  }, []);

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
            // navbarOffsetBreakpoint="xl"
            navbar={
              <Drawer
                opened={opened}
                onClose={() => setOpened(false)}
                // hidden={!opened}
                // width={{ base: 300 }}
                height="100vh"
                p="xs"
              >
                {/* Navbar content */}
              </Drawer>
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
                sx={{ backgroundColor: theme.colors.blue[4] }}
              >
                <Container className={classes.header}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <Burger
                      opened={opened}
                      onClick={() => setOpened((o) => !o)}
                      size="sm"
                      color="white"
                      // mr="sm"
                    />

                    <Title order={2} sx={{ color: "white" }}>
                      WanderlustBWA
                    </Title>

                    <ActionIcon
                      variant="outline"
                      color={colorScheme === "dark" ? "yellow" : "blue"}
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
                    <Button
                      onClick={() => {
                        logout({ returnTo: window.location.origin });
                      }}
                      className="logoutButton"
                    >
                      Log out
                    </Button>
                  </div>
                </Container>
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
