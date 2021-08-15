import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Card, CardBody } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "../redux/action";
import { useHistory } from "react-router";
import "../assets/css/otp.css";

export default function VerifyOTP() {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const otpLength = otp.toString().length;
  const { push } = useHistory();
  const email = localStorage.getItem("email");
  const handleSubmit = () =>
    otpLength === 4 && dispatch(verifyOtp({ email, otp }));
  const isOTPVerify = useSelector((state) => state.userDataReducer.isOTPVerify);
  useEffect(() => {
    if (isOTPVerify) {
      push("/login");
    }
  }, [isOTPVerify]);
  return (
    <div className="d-flex justify-content-center align-items-center container otp">
      <div className="card card-otp py-5 px-4">
        <h5 className="m-0">Email verification</h5>
        <span className="mobile-text mt-2">
          Welcome to Binery, We have send a otp to your email id{" "}
          <b className="text-info">{email}</b> please verify email to use
          services
        </span>
        <div className="d-flex flex-row mt-5">
          <OtpInput
            inputStyle="inputStyle"
            value={otp}
            isInputNum
            onChange={setOtp}
            numInputs={4}
            separator={<span>-</span>}
          />
        </div>
        <span
          onClick={handleSubmit}
          className={`${
            otpLength === 4 ? "text-danger cursor" : ""
          } text-center font-weight-bold  mt-3`}
        >
          Verify
        </span>

        <div className="text-center mt-3">
          <span className="d-block mobile-text">Don't receive the code?</span>
          <span className="font-weight-bold text-danger cursor">Resend</span>
        </div>
      </div>
    </div>
  );
}
