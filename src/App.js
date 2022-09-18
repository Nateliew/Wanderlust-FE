import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    // <EuiProvider colorMode="light">
    <div className="App">
      <Outlet />
    </div>
    // </EuiProvider>
  );
}

export default App;
