import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { forgotPassword } from "../redux/action";
import "../assets/css/login.css";
import { ForgotPasswordSchema } from "../validationScrema/user";

export default function ForgotPassword() {
  const { push } = useHistory();
  const isForgotpasswordSuccess = useSelector(
    (state) => state.userDataReducer.isForgotpasswordSuccess
  );
  const loading = useSelector((state) => state.userDataReducer.loading);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values) => {
      dispatch(forgotPassword(values));
    },
  });
  useEffect(() => {
    if (isForgotpasswordSuccess) {
      push("/login");
    }
  }, [isForgotpasswordSuccess]);
  const { errors, touched } = formik;

  return (
    <div className="content wrapper fadeInDown custom-input">
      <div id="formContent">
        <h2 className="text-dark text-center my-4">Forgot Password?</h2>
        <p className="text-dark">You can reset your password here.</p>

        {/* <div className="fadeIn first">
          <FontAwesomeIcon className="m-2" size="4x" icon={faUserCircle} />
        </div> */}
        <form
          id="register-form"
          role="form"
          autocomplete="off"
          className="form"
          method="post"
        >
          <input
            name="email"
            placeholder="email address"
            className="form-control"
            type="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {errors.email && touched.email && <div>{errors.email}</div>}

          <input
            type="submit"
            className="fadeIn fourth"
            value="Reset Password"
            disabled={
              !(formik.isValid && formik.dirty) ||
              loading ||
              isForgotpasswordSuccess
            }
            onClick={formik.handleSubmit}
          />
        </form>
        {/* <hr/> */}
        <p className="text-dark text-center mb-4">
          Go Back to <Link to="/login">Log In</Link>{" "}
        </p>
      </div>
    </div>
  );
}
