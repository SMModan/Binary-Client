// http://18.188.8.1954701/reset-password#93842836-3c0a-0c26-461c-b806536cff60

import {
  faCheckCircle,
  faLock,
  faStopCircle,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { resetPassword } from "../redux/action";
import "../assets/css/login.css";
import { useFormik } from "formik";
import { ResetPaaswordSchema } from "../validationScrema/user";
import api from "../service/axiosConfig";
import { apiCall, METHOD } from "../service";
import { GET_STRIPE_ACCOUNT_STATUS } from "../service";

export default function StripeStatus() {
  return (
    <div className="container mt-4">
    <div className="row m-4">
       <div className="col-md-6 mx-auto mt-4">
          <div className="payment mt-4">
             <div className="payment_header mt-4">
                <div className="check"><i className="fa fa-check" aria-hidden="true"></i></div>
             </div>
             <div className="content mt-4">
                <h1>Payment Failed !</h1>
                <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. </p>
                <Link to="/home">Try Again!</Link>
             </div>
             
          </div>
       </div>
    </div>
 </div>
  );
}
