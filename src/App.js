import "./App.css";
<<<<<<< HEAD
import { Outlet } from "react-router-dom";
// import { EuiProvider } from "@elastic/eui";
=======
import { useState } from "react";

// for testing frontend
import { Outlet, useNavigate } from "react-router-dom";

// for styling
import { bwaTheme } from "./Styling/Theme";
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
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons";
>>>>>>> b15a9d97a4ed947cab447bc2c941b86efa24abf6

function App() {
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const [colorScheme, setColorScheme] = useState("light");

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
<<<<<<< HEAD
    // <EuiProvider colorMode="light">
    <div className="App">
      <Outlet />
     <h1>helo</h1>
    </div>
    // </EuiProvider>
=======
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme }}
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
              p="md"
              hiddenBreakpoint="sm"
              hidden={!opened}
              width={{ sm: 200, lg: 300 }}
            >
              <Text>Application navbar</Text>
            </Navbar>
          }
          aside={
            <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
              <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
                <Text>Application sidebar</Text>
              </Aside>
            </MediaQuery>
          }
          footer={
            <Footer height={60} p="md">
              Application footer
            </Footer>
          }
          header={
            <Header height={70} p="md">
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
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                  />
                </MediaQuery>

                <Text>Application header</Text>
                <ActionIcon
                  variant="outline"
                  color={colorScheme === "dark" ? "yellow" : "blue"}
                  onClick={() => toggleColorScheme()}
                  title="Toggle color scheme"
                >
                  {colorScheme === "dark" ? (
                    <IconSun size={18} />
                  ) : (
                    <IconMoonStars size={18} />
                  )}
                </ActionIcon>
                <button onClick={() => navigate("/")}>Log out</button>
              </div>
            </Header>
          }
        >
          <Text>Resize app to see responsive navbar in action</Text>

          <Outlet />
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
>>>>>>> b15a9d97a4ed947cab447bc2c941b86efa24abf6
  );
}

export default App;
