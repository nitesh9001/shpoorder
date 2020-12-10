import axios from "axios";
import Constant from "../../Constant";
import { FETCH_CATG_LIST, FETCH_CATG_ERROR, FETCH_CATG_REQ } from "../types";

export const getCategoryReq = () => {
  return {
    type: FETCH_CATG_REQ,
  };
};

export const getCategorySucess = (category_list) => {
  return {
    type: FETCH_CATG_LIST,
    payload: category_list,
  };
};

export const getCategoryError = (error) => {
  return {
    type: FETCH_CATG_ERROR,
    error: error,
  };
};

export const fetchCategoryList = () => {
  return (dispatch) => {
    dispatch(getCategoryReq);
    axios
      .post(Constant.getAPI() + "/product/list", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("superadmin_auth")}`,
        },
      })
      .then((res) => {
        // if (res.status === true) {
          const category_list = res.data;
          dispatch(getCategorySucess(category_list));
        // }
      })
      .catch((err) => {
        const errMsg = err.messages;
        dispatch(getCategoryError(errMsg));
      });
  };
};
