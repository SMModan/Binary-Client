import { combineReducers } from "redux";
import userDataReducer from "./userDataReducer";
import ProductsReducer from "./ProductsReducer";
import PlanReducer from "./PlanReducer";
import CouponReducer from "./CouponReducer";
import CompanyReducer from "./CompanyReducer";

// Combine all reducers as root reducer
export default combineReducers({
  userDataReducer,
  ProductsReducer,
  PlanReducer,
  CouponReducer,
  CompanyReducer
});
