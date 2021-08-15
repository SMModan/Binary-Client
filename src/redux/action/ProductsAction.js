import { apiCall, METHOD } from "../../service/baseApiCall";
import {
  PRODUCT_CREATE,
  PRODUCT_LIST,
  PRODUCT_UD,
} from "../../service/apiEndpoints";
import {
  GET_PRODUCT_LIST,
  CREATE_PRODUCT_ACTION,
} from "../constants/action-types";
import { toast } from "react-toastify";

export const getProducts = (payload) => (dispacth) =>
  dispacth(getProductsInit());

const getProductsInit = () => (dispacth) => {
  dispacth({
    type: GET_PRODUCT_LIST.GET_PRODUCT_LIST_INITLIZATION,
    // payload,
  });
  apiCall(
    PRODUCT_LIST,
    {
      start: 0,
      limit: 10,
    },
    (res) => dispacth(getProductsSuccess(res.data.list)),
    (err) => dispacth(getProductsError(err)),
    METHOD.POST,
    {
      addAuthrize: true,
    }
  );
};
const getProductsSuccess = (payload) => (dispacth) => {
  dispacth({
    type: GET_PRODUCT_LIST.GET_PRODUCT_LIST_SUCCESS,
    payload,
  });
};
const getProductsError = (payload) => (dispacth) => {
  dispacth({
    type: GET_PRODUCT_LIST.GET_PRODUCT_LIST_ERORR,
    payload,
  });
};

export const deleteProduct = (data, isEdit = 0, setLoading, isDelete = false) => (
  dispacth
) => dispacth(createProductInit(data, isEdit, setLoading, isDelete));

export const createProduct = (data, isEdit = 0, setModal) => (dispacth) =>
  dispacth(createProductInit(data, isEdit, setModal));

const createProductInit = (data, isEdit, setModal, isDelete) => (dispacth) => {
  dispacth({
    type: CREATE_PRODUCT_ACTION.CREATE_PRODUCT_ACTION_INITLIZATION,
  });
  apiCall(
    isEdit ? PRODUCT_UD(isEdit) : PRODUCT_CREATE,
    data,
    (res) => {
      dispacth(createProductSuccess(res.data));
      setModal(false);
    },
    (err) => {
      dispacth(createProductError(err));
      setModal(false);
    },
    isDelete ? METHOD.DELETE : isEdit ? METHOD.PATCH : METHOD.POST,
    {
      addAuthrize: true,
    }
  );
};
const createProductSuccess = (payload) => (dispacth) => {
  toast.success(payload.message);
  dispacth({
    type: CREATE_PRODUCT_ACTION.CREATE_PRODUCT_ACTION_SUCCESS,
    // payload,
  });
};
const createProductError = (payload) => (dispacth) => {
  dispacth({
    type: CREATE_PRODUCT_ACTION.CREATE_PRODUCT_ACTION_ERORR,
    payload,
  });
};
