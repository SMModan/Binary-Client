import UserList from "../pages/UserList";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import VerifyOTP from "../pages/VerifyOTP";
import ResetPassword from "../pages/ResetPassword";
import UserProfile from "../pages/UserProfile";
import CheckoutCancel from "../pages/CheckoutCancel";
import Plan from "../pages/Plan";
import CheckoutSuccess from "../pages/CheckoutSuccess";
import Coupon from "../pages/Coupon";

export const publicRoutes = [
  {
    path: "/login",
    component: Login,
    noWrap: true,
  },
  {
    path: "/register",
    component: Register,
    noWrap: true,
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    noWrap: true,
  },
  {
    path: "/verify-OTP",
    component: VerifyOTP,
    noWrap: true,
  },
  {
    path: "/customer-reset-password",
    component: ResetPassword,
    noWrap: true,
  },
];
export const publicHeaderRoutes = [
  {
    path: "/home",
    component: Plan,
    name: "Dashboard",
    noWrap: false,
    isShowInSidebar: false,
    showHeader: true,
    showSidebar: false,
  },
  {
    path: "/coupon",
    component: Coupon,
    name: "Coupon",
    noWrap: false,
    isShowInSidebar: false,
    showHeader: true,
    showSidebar: false,
  },
  {
    path: "/success-checkout",
    component: CheckoutSuccess,
    // noWrap: true,
    isShowInSidebar: false,
    showHeader: true,
    showSidebar: false,
  }, {
    path: "/cancel-checkout",
    component: CheckoutCancel,
    // noWrap: true,
    isShowInSidebar: false,
    showHeader: true,
    showSidebar: false,
  },
];
export const secureRoutes = [
 
 
  // {
  //   path: "/plan",
  //   component: Plan,
  //   name: "Plan",
  //   isShowInSidebar: true,
  //   showHeader: true,
  //   showSidebar: true,
  // },
  // {
  //   path: "/products",
  //   component: ProductList,
  //   name: "Product List",
  //   isShowInSidebar: true,
  //   showHeader: true,
  //   showSidebar: true,
  // },

  {
    path: "/profile",
    component: UserProfile,
    showHeader: true,
    showSidebar: false,
  }
  // {
  //   path: "/complete-profile",
  //   component: CompleteProfilePage,
  //   showHeader: true,
  //   showSidebar: false,
  // },
  // {
  //   path: "/",
  //   component: () => <Redirect to="/home" />, // put this route at very last, else it will not accept routse we write below.
  // },
];
