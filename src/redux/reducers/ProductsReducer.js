import { GET_PRODUCT_LIST } from "../constants/action-types";
const initialState = {
  productList: [],
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCT_LIST.GET_PRODUCT_LIST_INITLIZATION:
      return { ...state, loading: true };
    case GET_PRODUCT_LIST.GET_PRODUCT_LIST_SUCCESS:
      return { ...state, productList: payload, loading: false };
    case GET_PRODUCT_LIST.GET_PRODUCT_LIST_ERORR:
      return { ...state, error: payload, loading: false };

    default:
      return state;
  }
};
