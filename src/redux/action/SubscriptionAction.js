import { apiCall, METHOD } from "../../service/baseApiCall";
import {
  SUBSCRIPTION_LIST
} from "../../service/apiEndpoints";
import {
GET_SUBSCRIPTION} from "../constants/action-types";
// import { toast } from "react-toastify";



export const getSubscription = (payload) => (dispacth) =>
  dispacth(getSubscriptionInit(payload));

const getSubscriptionInit = (company_id) => (dispacth) => {
  dispacth({
    type: GET_SUBSCRIPTION.GET_SUBSCRIPTION_LIST_INITIALIZATION,
    // payload,
  });
  apiCall(
    SUBSCRIPTION_LIST,
    {
      start: 0,
      limit: 10,
      company_id,
    },
      (res) => dispacth(getSubscriptionSuccess(res.data.list)),
    (err) => dispacth(getSubscriptionError(err)),
    METHOD.POST,
    {
      addAuthrize: true,
    }
  );
};

const getSubscriptionSuccess = (payload) => (dispacth) => {
  dispacth({
    type: GET_SUBSCRIPTION.GET_SUBSCRIPTION_LIST_SUCCESS,
    payload,
  });
};
const getSubscriptionError = (payload) => (dispacth) => {
  dispacth({
    type: GET_SUBSCRIPTION.GET_SUBSCRIPTION_LIST_FAILURE,
    payload,
  });
};