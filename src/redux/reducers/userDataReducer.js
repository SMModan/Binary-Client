import { getToken } from "../../utils";
import {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD,
  LOGOUT,
  VERIFY_OTP_ACTION,
  GET_PROFILE,
  RESET_PASSWORD,
} from "../constants/action-types";

const initialState = {
  company: {},
  user: {},
  loading: false,
  isLoggedin: !!getToken(),
  isRegisterd: false,
  isSetPasswordSuccess: false,
  isForgotpasswordSuccess: false,
  isOTPVerify: false,
};
export default (state = initialState, { type, payload = {}, company = {} }) => {
  switch (type) {
    case LOGIN.LOGIN_INITLIZATION:
      return {
        ...state,
        ...payload,
        loading: true,
      };
    case LOGIN.LOGIN_SUCCESS:
      return {
        ...state,
        company,
        isLoggedin: true,
        loading: false,
      };
    case LOGIN.LOGIN_ERORR:
      return {
        ...state,
        isLoggedin: false,
        loading: false,
      };
    case LOGOUT.LOGOUT_SUCCESS:
    case LOGOUT.LOGOUT_ERORR:
      return {
        ...state,
        isLoggedin: false,
        loading: false,
      };
    case REGISTER.REGISTER_INITLIZATION:
      return {
        ...state,
        loading: true,
      };
    case REGISTER.REGISTER_SUCCESS:
      return {
        ...state,
        isRegisterd: true,
        loading: false,
      };
    case REGISTER.REGISTER_ERORR:
      return {
        ...state,
        ...payload,
        isRegisterd: false,
        loading: false,
      };
    case RESET_PASSWORD.RESET_PASSWORD_INITLIZATION:
      return {
        ...state,
        loading: true,
      };
    case RESET_PASSWORD.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isSetPasswordSuccess: true,
        loading: false,
      };
    case RESET_PASSWORD.RESET_PASSWORD_ERORR:
      return {
        ...state,
        ...payload,
        isSetPasswordSuccess: false,
        loading: false,
      };
    case FORGOT_PASSWORD.FORGOT_PASSWORD_INITLIZATION:
      return {
        ...state,
        loading: true,
      };
    case FORGOT_PASSWORD.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isForgotpasswordSuccess: true,
        loading: false,
      };
    case FORGOT_PASSWORD.FORGOT_PASSWORD_ERORR:
      return {
        ...state,
        isForgotpasswordSuccess: false,
        loading: false,
      };
    case GET_PROFILE.GET_PROFILE_INITLIZATION:
      return {
        ...state,
        loading: true,
      };
    case GET_PROFILE.GET_PROFILE_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    case GET_PROFILE.GET_PROFILE_ERORR:
      return {
        ...state,
        user: {},
        loading: false,
      };
    case VERIFY_OTP_ACTION.VERIFY_OTP_ACTION_SUCCESS:
      return {
        ...state,
        isOTPVerify: true,
      };
    default:
      return state;
  }
};
