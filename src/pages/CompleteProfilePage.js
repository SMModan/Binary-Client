/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect } from "react";

// reactstrap components
import { Row, Col } from "reactstrap";
import { getProfile } from "../redux/action";
import { useDispatch } from "react-redux";
import UserProfileCard from "../components/User/UserProfileCard";
import CompleteProfile from "../components/User/CompleteProfile";

function UserProfile() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, []);
  return (
    <div className="custom-padding">
      <Row>
        <Col md="4">
          <UserProfileCard isCompleteProfile />
        </Col>
        <Col md="8">
          <CompleteProfile isCompleteProfile />
        </Col>
      </Row>
    </div>
  );
}

export default UserProfile;
