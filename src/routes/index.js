import SidebarAdminLayout from "../components/SidebarAdminLayout";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import {
  publicRoutes,
  secureRoutes,
  publicHeaderRoutes,
} from "./routeConstants";
import { useSelector } from "react-redux";
export default function Routes() {
  const isLoggedin = useSelector((state) => state.userDataReducer.isLoggedin);
  const histroy = useHistory();
  const location = useLocation();
  const isProfileCompleted = useSelector(
    (state) => state.userDataReducer.company.is_profile_completed
  );
  // useEffect(() => {
  //   if (
  //     isLoggedin &&
  //     !isProfileCompleted &&
  //     location.pathname !== "/complete-profile"
  //   ) {
  //     histroy.push("/complete-profile");
  //   }
  // }, [isLoggedin, isProfileCompleted, location.pathname]);
  return (
    <Switch>
        {publicRoutes.map((item, index) => (
          <Route key={index} {...item} />
        ))}
      <SidebarAdminLayout>
        {publicHeaderRoutes.map((item, index) => (
          <Route key={index} {...item} />
        ))}
      </SidebarAdminLayout>
      <SidebarAdminLayout>

        {isLoggedin &&
          secureRoutes.map((item, index) => <Route key={index} {...item} />)}
      <Route render={() => <Redirect to="/home" />} />
      </SidebarAdminLayout>

    </Switch>
  );
}
