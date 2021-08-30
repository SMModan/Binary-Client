import {  GET_SUBSCRIPTION } from "../constants/action-types";
const initialState = {
  couponList: [],
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_SUBSCRIPTION.GET_SUBSCRIPTION_LIST_INITIALIZATION:
      return { ...state, loading: true };
    case GET_SUBSCRIPTION.GET_SUBSCRIPTION_LIST_SUCCESS:
      return { ...state, subscriptionList: payload, loading: false };
    case GET_SUBSCRIPTION.GET_SUBSCRIPTION_LIST_FAILURE:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
};
