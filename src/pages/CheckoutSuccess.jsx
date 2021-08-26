// http://18.188.8.1954701/reset-password#93842836-3c0a-0c26-461c-b806536cff60

import {
  faCheckCircle,
  faLock,
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
    <div className="wrapper fadeInDown custom-input">
        <div className="fadeIn first">
          <FontAwesomeIcon
            className="m-2 text-primary"
            size="4x"
            icon={faCheckCircle}
          />
        </div>
        <h3 className="text-body">Success</h3>
    </div>
  );
}
