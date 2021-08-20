import { toast } from "react-toastify";
import { getAPIHeader } from "../utils";
import axios from "./axiosConfig";

export const METHOD = {
  POST: "post",
  GET: "get",
  PUT: "put",
  DELETE: "delete",
  PATCH: "patch",
};

export const apiCall = (
  endpoint,
  params = {},
  onSuccess,
  onFailure,
  method = METHOD.GET,
  dyanamicConfig = {
    addAuthrize: false,
    showErrorToast: true,
    customParams: {},
  }
) => {
  console.log(
    endpoint,
    params,
    "onSuccess",
    "onFailure",
    method,
    dyanamicConfig
  );
  let request = {};
  switch (method) {
    case METHOD.POST:
      request = axios.post(
        endpoint,
        params,
        dyanamicConfig.addAuthrize
          ? getAPIHeader()
          : dyanamicConfig.customParams
      );
      break;
    case METHOD.GET:
      request = axios.get(
        endpoint,
        dyanamicConfig.addAuthrize
          ? getAPIHeader()
          : dyanamicConfig.customParams
      );
      break;
    case METHOD.DELETE:
      request = axios.delete(
        endpoint,
        dyanamicConfig.addAuthrize
          ? getAPIHeader()
          : dyanamicConfig.customParams
      );
      break;
    case METHOD.PUT:
      request = axios.put(
        endpoint,
        params,
        dyanamicConfig.addAuthrize
          ? getAPIHeader()
          : dyanamicConfig.customParams
      );
      break;
    case METHOD.PATCH:
      request = axios.patch(
        endpoint,
        params,
        dyanamicConfig.addAuthrize
          ? getAPIHeader()
          : dyanamicConfig.customParams
      );
      break;
  }
  request
    .then((response) => {
      if (dyanamicConfig.showErrorToast && response.data.success === 0) {
        let error = response.data.error;
        toast.error(typeof error === "string" ? error : error.message);
      }
      if (
        (response.status == 200 ||
          response.status == 201 ||
          response.status == 204 ||
          response.data) &&
        response.data.success === 1
      ) {
        onSuccess(response && response.data);
      } else {
        console.log(response && response.data);
        onFailure("Something went wrong");
      }
    })
    .catch((error) => {
      console.log(error)
      if (
        dyanamicConfig.showErrorToast &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.success === 0
      ) {
        console.log(error.response);
        toast.error(error.response.data.error);
      }
      if (error && error.response) {
        switch (error.response.status) {
          case 401:
            onFailure(
              error.response.data && typeof error.response.data.detail
                ? error.response.data.detail
                : "Session expired"
            );
            break;

          default:
            onFailure(
              error.response.data ? error.response.data : "Something went wrong"
            );
            break;
        }
      } else onFailure && onFailure("Something went wrong");
    });
};
