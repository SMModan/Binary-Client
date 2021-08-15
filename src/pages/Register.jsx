import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SignupSchema } from "../validationScrema/user";
import "../assets/css/register.css";
import { register } from "../redux/action";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

export default function Register() {
  const { push } = useHistory();
  const loading = useSelector((state) => state.userDataReducer.loading);
  const isRegisterd = useSelector((state) => state.userDataReducer.isRegisterd);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isRegisterd) {
      push("/verify-OTP");
    }
  }, [isRegisterd]);
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(register(values));
    },
  });
  const { errors, touched } = formik;

  return (
    <div className="content wrapper fadeInDown custom-input">
      <div id="formContent">
        <div className="fadeIn first">
          <FontAwesomeIcon className="m-2" size="4x" icon={faUserCircle} />
        </div>

        {/* <!-- Login Form --> */}
        <form>
          <input
            name="first_name"
            className="form-control"
            onBlur={formik.handleBlur}
            placeholder="First name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.first_name}
          />
          {errors.first_name && touched.first_name && (
            <span
              className="text-danger float-left "
              style={{ marginLeft: "40px" }}
            >
              {errors.first_name}
            </span>
          )}
          <input
            name="last_name"
            className="form-control"
            onBlur={formik.handleBlur}
            placeholder="Last name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.last_name}
          />
          {errors.last_name && touched.last_name && (
            <span
              className="text-danger float-left "
              style={{ marginLeft: "40px" }}
            >
              {errors.last_name}
            </span>
          )}

          <input
            name="email"
            className="form-control"
            placeholder="Email address"
            type="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
          />

          {errors.email && touched.email && (
            <span
              className="text-danger float-left "
              style={{ marginLeft: "40px" }}
            >
              {errors.email}
            </span>
          )}
          <input
            name="password"
            className="form-control"
            onBlur={formik.handleBlur}
            placeholder="Password"
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
            value="Create Account"
            disabled={
              !(formik.isValid && formik.dirty) || loading || isRegisterd
            }
            onClick={formik.handleSubmit}
          />
        </form>
        {/* <hr/> */}
        <p className="text-dark text-center">
          Have an account? <Link to="/login">Log In</Link>{" "}
        </p>
        {/* <!-- Remind Passowrd --> */}
        <div id="formFooter">
          <Link className="underlineHover" to="/forgot-password">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}
