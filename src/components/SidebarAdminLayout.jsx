import React, { useState } from "react";
import AdminNavbar from "./Navbars/AdminNavbar";
import Sidebar from "./Sidebar/Sidebar";
import PerfectScrollbar from "perfect-scrollbar";
import { useHistory, useLocation } from "react-router";
import {
  publicRoutes,
  secureRoutes,
  publicHeaderRoutes,
} from "../routes/routeConstants";
import logo from "../assets/img/react-logo.png";

var ps;
export default function SidebarAdminLayout(props) {
  const location = useLocation();
  const { push } = useHistory();
  const mainPanelRef = React.useRef(null);
  const [currentPathData, setCurrentPathData] = useState({
    showHeader: false,
    showSidebar: false,
    noWrap: false,
  });
  React.useEffect(() => {
    const data = [...publicRoutes, ...secureRoutes, ...publicHeaderRoutes].find(
      (item) => item.path === location.pathname
    ); // set your path data in routing and custmize here
    if (data) {
      setCurrentPathData(data);
    } else if (location.pathname === "/") {
      push("/home");
    }
  }, [location.pathname, publicRoutes, secureRoutes]);
  const [sidebarOpened, setsidebarOpened] = React.useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(mainPanelRef.current, {
        suppressScrollX: true,
      });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.classList.add("perfect-scrollbar-off");
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, [location]);
  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setsidebarOpened(!sidebarOpened);
  };

  const getBrandText = (path) => {
    for (let i = 0; i < secureRoutes.length; i++) {
      if (
        location.pathname.indexOf(
          secureRoutes[i].layout + secureRoutes[i].path
        ) !== -1
      ) {
        return secureRoutes[i].name;
      }
    }
    return "Brand";
  };

  return currentPathData.noWrap ? (
    props.children
  ) : (
    <div className="wrapper">
      {currentPathData.showSidebar && ( // set it from router
        <Sidebar
          routes={secureRoutes.filter((item) => item.isShowInSidebar)}
          logo={{
            outterLink: "#",
            text: "Binary",
            imgSrc: logo,
          }}
          toggleSidebar={toggleSidebar}
        />
      )}
      <div className="main-panel" ref={mainPanelRef}>
        {currentPathData.showHeader && ( // set it from router
          <AdminNavbar
            brandText={getBrandText(location.pathname)}
            toggleSidebar={toggleSidebar}
            sidebarOpened={sidebarOpened}
          />
        )}
        {props.children}
      </div>
    </div>
  );
}
