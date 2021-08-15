import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { login } from "../redux/action";
import "../assets/css/login.css";
import { useFormik } from "formik";
import { LoginSchema } from "../validationScrema/user";

export default function Login() {
  const { push } = useHistory();
  const isLoggedin = useSelector((state) => state.userDataReducer.isLoggedin);
  const loading = useSelector((state) => state.userDataReducer.loading);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      dispatch(login(values));
      // console.log(values);
    },
  });
  useEffect(() => {
    if (isLoggedin) {
      push("/home");
    }
  }, [isLoggedin]);
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
            type="text"
            className="fadeIn second"
            name="email"
            placeholder="Email Address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
            type="password"
            className="fadeIn third"
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
            type="submit"
            className="fadeIn fourth"
            value="Log In"
            disabled={loading || isLoggedin}
            onClick={formik.handleSubmit}
          />
          {loading && <div className="cover-spin" role="status" />}
        </form>
        {/* <hr/> */}
        <p className="text-dark text-center">
          or Register <Link to="/register">here</Link>{" "}
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
