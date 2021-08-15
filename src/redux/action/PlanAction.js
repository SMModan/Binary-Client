import { apiCall, METHOD } from "../../service/baseApiCall";
import {
  PLAN_CREATE,
  PLAN_LIST,
  PLAN_UD,
} from "../../service/apiEndpoints";
import {
  GET_PLAN_LIST,
  CREATE_PLAN_ACTION,
} from "../constants/action-types";
import { toast } from "react-toastify";

export const getPlan = (payload) => (dispacth) =>
  dispacth(getPlanInit(payload));

const getPlanInit = (company_id) => (dispacth) => {
  dispacth({
    type: GET_PLAN_LIST.GET_PLAN_LIST_INITLIZATION,
    // payload,
  });
  apiCall(
    PLAN_LIST,
    {
      start: 0,
      limit: 10,
      company_id: company_id || 1
    },
    (res) => dispacth(getPlanSuccess(res.data.list)),
    (err) => dispacth(getPlanError(err)),
    METHOD.POST,
    {
      addAuthrize: true,
    }
  );
};
const getPlanSuccess = (payload) => (dispacth) => {
  dispacth({
    type: GET_PLAN_LIST.GET_PLAN_LIST_SUCCESS,
    payload,
  });
};
const getPlanError = (payload) => (dispacth) => {
  dispacth({
    type: GET_PLAN_LIST.GET_PLAN_LIST_ERORR,
    payload,
  });
};

export const deletePlan = (data, isEdit = 0, setLoading, isDelete = false) => (
  dispacth
) => dispacth(createPlanInit(data, isEdit, setLoading, isDelete));

export const createPlan = (data, isEdit = 0, setModal) => (dispacth) =>
  dispacth(createPlanInit(data, isEdit, setModal));

const createPlanInit = (data, isEdit, setModal, isDelete) => (dispacth) => {
  dispacth({
    type: CREATE_PLAN_ACTION.CREATE_PLAN_ACTION_INITLIZATION,
  });
  apiCall(
    isEdit ? PLAN_UD(isEdit) : PLAN_CREATE,
    data,
    (res) => {
      dispacth(createPlanSuccess(res.data));
      setModal(false);
    },
    (err) => {
      dispacth(createPlanError(err));
      setModal(false);
    },
    isDelete ? METHOD.DELETE : isEdit ? METHOD.PATCH : METHOD.POST,
    {
      addAuthrize: true,
    }
  );
};
const createPlanSuccess = (payload) => (dispacth) => {
  toast.success(payload.message);
  dispacth({
    type: CREATE_PLAN_ACTION.CREATE_PLAN_ACTION_SUCCESS,
    // payload,
  });
};
const createPlanError = (payload) => (dispacth) => {
  dispacth({
    type: CREATE_PLAN_ACTION.CREATE_PLAN_ACTION_ERORR,
    payload,
  });
};
