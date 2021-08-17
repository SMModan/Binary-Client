import UserList from "../pages/UserList";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import VerifyOTP from "../pages/VerifyOTP";
import ResetPassword from "../pages/ResetPassword";
import UserProfile from "../pages/UserProfile";
import CompleteProfilePage from "../pages/CompleteProfilePage";
import Plan from "../pages/Plan";
import ProductList from "../pages/ProductList";
import Coupon from "../pages/Coupon";

export const publicRoutes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
  },
  {
    path: "/verify-OTP",
    component: VerifyOTP,
  },
  {
    path: "/reset-password",
    component: ResetPassword,
  },
];
export const publicHeaderRoutes = [
  {
    path: "/home",
    component: Plan,
    name: "Dashboard",
    isShowInSidebar: false,
    showHeader: true,
    showSidebar: false,
  },
  {
    path: "/coupon",
    component: Coupon,
    name: "Coupon",
    isShowInSidebar: false,
    showHeader: true,
    showSidebar: false,
  },
];
export const secureRoutes = [
  // {
  //   path: "/home",
  //   component: Plan,
  //   name: "Dashboard",
  //   isShowInSidebar: false,
  //   showHeader: true,
  //   showSidebar: false,
  // },
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
  
  // {
  //   path: "/profile",
  //   component: UserProfile,
  //   showHeader: true,
  //   showSidebar: false,
  // },
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
