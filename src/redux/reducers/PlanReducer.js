import { GET_PLAN_LIST, GET_COMAPNY_LIST } from "../constants/action-types";
const initialState = {
  planList: [],
  loading: true,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PLAN_LIST.GET_PLAN_LIST_INITLIZATION:
      return { ...state, loading: true };
    case GET_PLAN_LIST.GET_PLAN_LIST_SUCCESS:
      return { ...state, planList: payload, loading: false };
    case GET_PLAN_LIST.GET_PLAN_LIST_ERORR:
      return { ...state, error: payload, loading: false };
    case GET_COMAPNY_LIST.GET_COMAPNY_LIST_ERORR:
      return { ...state, loading: false };
    case GET_PLAN_LIST.FLUSH_PLANS:
      return { ...state, planList: [], loading: false };
    default:
      return state;
  }
};
