// http://18.188.8.1954701/reset-password#93842836-3c0a-0c26-461c-b806536cff60

import { faLock, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { resetPassword } from "../redux/action";
import "../assets/css/login.css";
import { useFormik } from "formik";
import { ResetPaaswordSchema } from "../validationScrema/user";

export default function ResetPassword() {
  const {
    push,
    location: { hash },
  } = useHistory();
  const isSetPasswordSuccess = useSelector(
    (state) => state.userDataReducer.isSetPasswordSuccess
  );
  const loading = useSelector((state) => state.userDataReducer.loading);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: ResetPaaswordSchema,
    onSubmit: (values) => {
      const payload = {
        token: hash.slice(1, hash.length),
        password: values.password,
      };
      dispatch(resetPassword(payload));
      // console.log(values);
    },
  });
  useEffect(() => {
    if (isSetPasswordSuccess) {
      push("/login");
    }
  }, [isSetPasswordSuccess]);
  const { errors, touched } = formik;
  return (
    <div className="content wrapper fadeInDown custom-input">
      <div id="formContent">
        <div className="fadeIn first">
          <FontAwesomeIcon className="m-2" size="4x" icon={faLock} />
        </div>
        <form>
          <input
            name="password"
            className="form-control"
            onBlur={formik.handleBlur}
            placeholder="Create password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {errors.password && touched.password && (
            <span
              className="text-danger float-left "
              style={{ marginLeft: "40px" }}
            >
              {errors.password}
            </span>
          )}
          <input
            name="passwordConfirmation"
            className="form-control"
            onBlur={formik.handleBlur}
            placeholder="Repeat password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.passwordConfirmation}
          />
          {errors.passwordConfirmation && touched.passwordConfirmation && (
            <span
              className="text-danger float-left "
              style={{ marginLeft: "40px" }}
            >
              {errors.passwordConfirmation}
            </span>
          )}
          <input
            type="submit"
            className="fadeIn fourth"
            value="Reset Password"
            disabled={!(formik.isValid && formik.dirty) || loading}
            onClick={formik.handleSubmit}
          />
        </form>
      </div>
    </div>
  );
}
