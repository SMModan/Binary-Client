import React from "react";
import { useHistory } from "react-router-dom";
// javascript plugin used to create scrollbars on windows

// core components
// import AdminNavbar from "../components/Navbars/AdminNavbar";

import Dashboard from "../components/Dashboard";
import { useSelector } from "react-redux";
import SidebarAdminLayout from "../components/SidebarAdminLayout";
import "../assets/css/black-dashboard-react.css";

function Home() {
  return <Dashboard />;
}

export default Home;
