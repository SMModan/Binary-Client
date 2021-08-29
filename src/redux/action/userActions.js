import axios from "axios";
import { removeToken, saveToken } from "../../utils";
import {
  FORGOT_PASSWORD_SERVICE,
  LOGIN_SERVICE,
  SIGNUP_SERVICE,
  VERIFY_OTP,
  GET_PROFILE_SERVICE,
  LOGOUT_SERVICE,
  RESET_PASSWORD_SERVICE,
  CHECKOUT_API,
} from "../../service/apiEndpoints";
import { apiCall, METHOD } from "../../service/baseApiCall";
import {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD,
  LOGOUT,
  CHECKOUT_ACTION,
  VERIFY_OTP_ACTION,
  GET_PROFILE,
  RESET_PASSWORD,
} from "../constants/action-types";
import { toast } from "react-toastify";

export const login = (data) => (dispatch) => {
  dispatch(loginInit(data));
};
const loginInit = (data) => (dispatch) => {
  dispatch({
    type: LOGIN.LOGIN_INITLIZATION,
  });
  apiCall(
    LOGIN_SERVICE,
    data,
    (res) => dispatch(loginSuccess(res)),
    (err) => dispatch(loginError(err)),
    METHOD.POST
  );
};
const loginSuccess = (res) => (dispatch) => {
  saveToken(res.data.auth.token);
  dispatch({
    type: LOGIN.LOGIN_SUCCESS,
    company: res.data.company,
  });
};
const loginError = () => (dispatch) => {
  dispatch({
    type: LOGIN.LOGIN_ERORR,
  });
};
export const register = (data) => (dispatch) => {
  delete data.passwordConfirmation;
  localStorage.setItem("email", data.email);
  dispatch(registerInit(data));
};
const registerInit = (data) => (dispatch) => {
  dispatch({
    type: REGISTER.REGISTER_INITLIZATION,
  });
  apiCall(
    SIGNUP_SERVICE,
    data,
    (res) => dispatch(registerSuccess(res)),
    (err) => dispatch(registerError(err)),
    METHOD.POST,
    {}
  );
};
const registerSuccess = () => (dispatch) => {
  dispatch({
    type: REGISTER.REGISTER_SUCCESS,
  });
};
const registerError = () => (dispatch) => {
  localStorage.removeItem("email");
  dispatch({
    type: REGISTER.REGISTER_ERORR,
  });
};

export const logout = (push) => (dispatch) => {
  dispatch(logoutInit(push));
};

const logoutInit = (push) => (dispatch) => {
  dispatch({
    type: LOGOUT.LOGOUT_INITLIZATION,
  });
  apiCall(
    LOGOUT_SERVICE,
    {},
    (res) => dispatch(logoutSuccess(res, push)),
    (err) => dispatch(logoutError(err, push)),
    METHOD.GET,
    { addAuthrize: true, showErrorToast: false }
  );
};
const logoutSuccess = (res, push) => (dispatch) => {
  removeToken();
  dispatch({
    type: LOGOUT.LOGOUT_SUCCESS,
  });
  push("/login");
};
const logoutError = (err, push) => (dispatch) => {
  removeToken();
  dispatch({
    type: LOGOUT.LOGOUT_ERORR,
  });
  push("/login");
};

export const checkout =
  (payload = {}, push) =>
  (dispatch) => {
    const newPayload = {
      locale: "zh-HK",
      success_url: "http://localhost:3000/success-checkout",
      cancel_url: "http://localhost:3000/cancel-checkout",
      m_prefix: "binery",
      ...payload,
    };
    console.log("newPayload  ==>",newPayload)
    console.log("payload  ==>",payload)
    dispatch(checkoutInit(newPayload, push));
  };
const checkoutInit = (payload, push) => (dispatch) => {
  dispatch({
    type: CHECKOUT_ACTION.CHECKOUT_ACTION_INITLIZATION,
  });
  apiCall(
    CHECKOUT_API,
    payload,
    (res) => dispatch(checkoutSuccess(res, push)),
    (err) => dispatch(checkoutError(err, push)),
    METHOD.POST,
    { addAuthrize: true, showErrorToast: false }
  );
};
const checkoutSuccess = (res, push) => (dispatch) => {
  console.log("checkoutSuccess",res.data.url);
  const url = res.data.url
  dispatch({
    type: CHECKOUT_ACTION.CHECKOUT_ACTION_SUCCESS,
  });
  window.open(url,"_self")
  // push("/login");
};
const checkoutError = (err, push) => (dispatch) => {
  dispatch({
    type: CHECKOUT_ACTION.CHECKOUT_ACTION_ERORR,
  });
   push("/cancel-checkout");
};

export const forgotPassword = (data) => (dispatch) => {
  dispatch(forgotPasswordInit(data));
};
const forgotPasswordInit = (data) => (dispatch) => {
  dispatch({
    type: FORGOT_PASSWORD.FORGOT_PASSWORD_INITLIZATION,
  });
  apiCall(
    FORGOT_PASSWORD_SERVICE,
    data,
    (res) => dispatch(forgotPasswordSuccess(res.data)),
    (err) => dispatch(forgotPasswordError(err)),
    METHOD.POST,
    {}
  );
};
const forgotPasswordSuccess = (payload) => (dispatch) => {
  toast.success(payload.message);
  dispatch({
    type: FORGOT_PASSWORD.FORGOT_PASSWORD_SUCCESS,
  });
};
const forgotPasswordError = () => (dispatch) => {
  dispatch({
    type: FORGOT_PASSWORD.FORGOT_PASSWORD_ERORR,
  });
};

export const verifyOtp = (data) => (dispatch) => {
  dispatch(verifyOtpInit(data));
};
const verifyOtpInit = (data) => (dispatch) => {
  dispatch({
    type: VERIFY_OTP_ACTION.VERIFY_OTP_ACTION_INITLIZATION,
  });
  apiCall(
    VERIFY_OTP,
    data,
    (res) => dispatch(verifyOtpSuccess(res)),
    (err) => dispatch(verifyOtpError(err)),
    METHOD.POST,
    {}
  );
};
const verifyOtpSuccess = () => (dispatch) => {
  dispatch({
    type: VERIFY_OTP_ACTION.VERIFY_OTP_ACTION_SUCCESS,
  });
};
const verifyOtpError = () => (dispatch) => {
  dispatch({
    type: VERIFY_OTP_ACTION.VERIFY_OTP_ACTION_ERORR,
  });
};

export const getProfile = (data) => (dispatch) => {
  dispatch(getProfileInit(data));
};
const getProfileInit = (data) => (dispatch) => {
  dispatch({
    type: GET_PROFILE.GET_PROFILE_INITLIZATION,
  });
  apiCall(
    GET_PROFILE_SERVICE,
    data,
    (res) => dispatch(getProfileSuccess(res.data.customer)),
    (err) => dispatch(getProfileError(err)),
    METHOD.GET,
    { addAuthrize: true }
  );
};
const getProfileSuccess = (payload) => (dispatch) => {
  dispatch({
    type: GET_PROFILE.GET_PROFILE_SUCCESS,
    payload,
  });
};
const getProfileError = () => (dispatch) => {
  dispatch({
    type: GET_PROFILE.GET_PROFILE_ERORR,
  });
};
export const updateUserProfileForm = (payload) => (dispatch) => {
  dispatch({
    type: GET_PROFILE.UPDATE_USER_FORM_DATA,
    payload,
  });
};

export const resetPassword = (data) => (dispatch) => {
  dispatch(resetPasswordInit(data));
};
const resetPasswordInit = (data) => (dispatch) => {
  dispatch({
    type: RESET_PASSWORD.RESET_PASSWORD_INITLIZATION,
  });
  apiCall(
    RESET_PASSWORD_SERVICE,
    data,
    (res) => dispatch(resetPasswordSuccess(res.data)),
    (err) => dispatch(resetPasswordError(err)),
    METHOD.POST
  );
};
const resetPasswordSuccess = (payload) => (dispatch) => {
  toast.success(payload.message);
  dispatch({
    type: RESET_PASSWORD.RESET_PASSWORD_SUCCESS,
  });
};
const resetPasswordError = () => (dispatch) => {
  dispatch({
    type: RESET_PASSWORD.RESET_PASSWORD_ERORR,
  });
};
