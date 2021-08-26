// COMPANY API END POINTS
export const LOGIN_SERVICE = "/customer/login";
export const SIGNUP_SERVICE = "/customer/signUp";
export const FORGOT_PASSWORD_SERVICE = "/customer/forgotPassword";
export const INDUSTRY_LIST_SERVICE = "/customer/industryList";
export const VERIFY_OTP = "/customer/verifyOtp";
export const GET_PROFILE_SERVICE = "/customer/profile";
export const EDIT_PROFILE = "/customer/editProfile";
export const COMPLETE_PROFILE = "/customer/complete-profile";
export const LOGOUT_SERVICE = "/customer/logout";
export const RESET_PASSWORD_SERVICE = "/customer/resetpassword";

// PRODUCTS API END POINTS
export const PRODUCT_LIST = "/product/list";
export const PRODUCT_CREATE = "/product/create";
export const PRODUCT_UD = (id) => `/product/${id}`;

// PLAN API END POINTS
export const PLAN_LIST = "/customer/companyPlanList";
export const PLAN_CREATE = "/plan/create";
export const PLAN_UD = (id) => `/plan/${id}`;

// COUPON API END POINTS
export const COUPON_LIST = "/customer/companyCouponList";
export const COUPON_CREATE = "/coupon/create";
export const COUPON_UD = (id) => `/coupon/${id}`;

// COMPANY LIST
export const COMPANY_LIST = "/customer/companyList";

// CHECKOUT API
export const CHECKOUT_API = '/subscription/create-checkout-session'