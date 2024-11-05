import React from "react";
import CameraTable from "./components/cameraTable";
import CmpnyLogo from "./images/Brand_Logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* Centered SVG logo */}
      <img src={CmpnyLogo} alt="Company Logo" className="logo" />
      <h1>Cameras</h1>
      <p>Manage your cameras here.</p>
      <CameraTable />
    </div>
  );
}

export default App;
