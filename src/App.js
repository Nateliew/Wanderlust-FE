import "./App.css";
import axios from "axios";
import { useState, useEffect, createContext, useContext } from "react";
// for testing frontend
import { Outlet, useNavigate } from "react-router-dom";
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
  MediaQuery,
  Burger,
  useMantineTheme,
  ActionIcon,
  ColorSchemeProvider,
  Title,
  Button,
  Anchor,
  createStyles,
  Container,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons";
import LogoutButton from "./Components/Logout";
import NavbarMinimal from "../src/Components/Navbars";

export const UserContext = createContext();

const useStyles = createStyles((theme) => ({
  navbar: {
    [theme.fn.largerThan("sm")]: {
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
    console.log("did this run?");
    console.log("user in app", user);

    const userInfo = await axios.post(
      `${process.env.REACT_APP_API_SERVER}/users`,
      {
        name: user.nickname,
        email: user.email,
      }
    );
    console.log("USERINFO", userInfo);
    setUserId(userInfo.data[0].id);
  };

  useEffect(() => {
    console.log("hello");
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
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
              <Navbar
                width={{ base: "100%", sm: 10 }}
                hidden={!opened}
                className={classes.navbar}
              >
                <Anchor>Home</Anchor>
                <Anchor>Trips</Anchor>
                <Anchor></Anchor>
              </Navbar>
            }
            // aside={
            //   <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            //       <Text>Application sidebar</Text>
            //     </Aside>
            //   </MediaQuery>
            // }
            // footer={
            //   <Footer height={60} p="md">
            //     Application footer
            //   </Footer>
            // }
            // aside={
            //   <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            //     {/* <TestSide /> */}
            //   </Aside>
            // }
            header={
              <Header height={70} p="md">
                <Container className={classes.header}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                      <Burger
                        opened={opened}
                        onClick={() => setOpened((o) => !o)}
                        size="xl"
                        color={theme.colors.gray[6]}
                        mr="xl"
                      />
                    </MediaQuery>
                    <Text fontFamily="Vollkorn">WanderlustBwa</Text>
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
