import "./App.css";
import { Outlet } from "react-router-dom";
// import { EuiProvider } from "@elastic/eui";

function App() {
  return (
    // <EuiProvider colorMode="light">
    <div className="App">
      <Outlet />
     <h1>helo</h1>
    </div>
    // </EuiProvider>
  );
}

export default App;
