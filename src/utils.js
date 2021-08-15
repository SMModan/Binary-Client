import Cookies from "js-cookie";

export const saveToken = (token) =>
  Cookies.set("token", token, { path: "/", expires: 1 });
export const removeToken = () => Cookies.remove("token", { path: "/" });
export const getToken = () => Cookies.get("token");

export const getAPIHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// export const createOptionsArray = (arrayData = [], keyName, valueName) =>
//   !arrayData?.length
//     ? []
//     : arrayData.map(({ [keyName]: label, [valueName]: value }) => ({
//         label,
//         value,
//       }));
