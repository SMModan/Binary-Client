import { apiCall, METHOD } from "./baseApiCall";
import { INDUSTRY_LIST_SERVICE } from "./apiEndpoints";

export const getIndustries = (saveData, getError) =>
  apiCall(
    INDUSTRY_LIST_SERVICE,
    {},
    ({ data }) => {
      if (data.list.length) {
        saveData(
          data.list.map(({ Industry_desc: label, Industry_ID: value }) => ({
            label,
            value,
          }))
        );
      }
    },
    (err) => console.log(err),
    METHOD.GET
  );
