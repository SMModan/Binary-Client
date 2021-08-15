import { apiCall, METHOD } from "../../service/baseApiCall";
import {
  PRODUCT_CREATE,
  COMPANY_LIST,
  PRODUCT_UD,
} from "../../service/apiEndpoints";
import {
  GET_COMAPNY_LIST,
  CREATE_PRODUCT_ACTION,
} from "../constants/action-types";
import { toast } from "react-toastify";

export const getCompany = (payload) => (dispacth) =>
  dispacth(getCompanyInit());

const getCompanyInit = () => (dispacth) => {
  dispacth({
    type: GET_COMAPNY_LIST.GET_COMAPNY_LIST_INITLIZATION,
    // payload,
  });
  apiCall(
    COMPANY_LIST,
    {
      start: 0,
      limit: 10,
    },
    (res) => dispacth(getCompanySuccess(res.data.list)),
    (err) => dispacth(getCompanyError(err)),
    METHOD.POST,
    {
      addAuthrize: true,
    }
  );
};
const getCompanySuccess = (payload) => (dispacth) => {
  dispacth({
    type: GET_COMAPNY_LIST.GET_COMAPNY_LIST_SUCCESS,
    payload,
  });
};
const getCompanyError = (payload) => (dispacth) => {
  dispacth({
    type: GET_COMAPNY_LIST.GET_COMAPNY_LIST_ERORR,
    payload,
  });
};

// export const deleteProduct = (data, isEdit = 0, setLoading, isDelete = false) => (
//   dispacth
// ) => dispacth(createProductInit(data, isEdit, setLoading, isDelete));

// export const createProduct = (data, isEdit = 0, setModal) => (dispacth) =>
//   dispacth(createProductInit(data, isEdit, setModal));

// const createProductInit = (data, isEdit, setModal, isDelete) => (dispacth) => {
//   dispacth({
//     type: CREATE_PRODUCT_ACTION.CREATE_PRODUCT_ACTION_INITLIZATION,
//   });
//   apiCall(
//     isEdit ? PRODUCT_UD(isEdit) : PRODUCT_CREATE,
//     data,
//     (res) => {
//       dispacth(createProductSuccess(res.data));
//       setModal(false);
//     },
//     (err) => {
//       dispacth(createProductError(err));
//       setModal(false);
//     },
//     isDelete ? METHOD.DELETE : isEdit ? METHOD.PATCH : METHOD.POST,
//     {
//       addAuthrize: true,
//     }
//   );
// };
// const createProductSuccess = (payload) => (dispacth) => {
//   toast.success(payload.message);
//   dispacth({
//     type: CREATE_PRODUCT_ACTION.CREATE_PRODUCT_ACTION_SUCCESS,
//     // payload,
//   });
// };
// const createProductError = (payload) => (dispacth) => {
//   dispacth({
//     type: CREATE_PRODUCT_ACTION.CREATE_PRODUCT_ACTION_ERORR,
//     payload,
//   });
// };
