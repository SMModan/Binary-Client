import { GET_COUPON_LIST } from "../constants/action-types";
const initialState = {
  couponList: [],
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_COUPON_LIST.GET_COUPON_LIST_INITLIZATION:
      return { ...state, loading: true };
    case GET_COUPON_LIST.GET_COUPON_LIST_SUCCESS:
      return { ...state, couponList: payload, loading: false };
    case GET_COUPON_LIST.GET_COUPON_LIST_ERORR:
      return { ...state, error: payload, loading: false };

    default:
      return state;
  }
};
