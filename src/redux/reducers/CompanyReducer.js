import { GET_COMAPNY_LIST } from "../constants/action-types";
const initialState = {
  companyList: [],
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_COMAPNY_LIST.GET_COMAPNY_LIST_INITLIZATION:
      return { ...state, loading: true };
    case GET_COMAPNY_LIST.GET_COMAPNY_LIST_SUCCESS:
      return { ...state, companyList: payload, loading: false };
    case GET_COMAPNY_LIST.GET_COMAPNY_LIST_ERORR:
      return { ...state, error: payload, loading: false };
    case GET_COMAPNY_LIST.FLUSH_COMPANIES:
      return { ...state, companyList: [], loading: false };
    default:
      return state;
  }
};
