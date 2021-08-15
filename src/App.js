import React from "react";
import Routes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import SidebarAdminLayout from "./components/SidebarAdminLayout";
function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
