import axios from "axios";
import Constant from "../../Constant";
import { FETCH_CITY_LIST, FETCH_CITY_ERROR, FETCH_CITY_REQ } from "../types";

export const getproductReq = () => {
  return {
    type: FETCH_CITY_REQ,
  };
};

export const getproductSucess = (product_list) => {
  return {
    type: FETCH_CITY_LIST,
    payload: product_list,
  };
};

export const getproductError = (error) => {
  return {
    type: FETCH_CITY_ERROR,
    error: error,
  };
};

export const fetchProductList = () => {
  return (dispatch) => {
    dispatch(getproductReq);
    axios
      .get(Constant.getAPI() + "/product/list", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJmOGI5Y2I3LWM2OGMtNGU0ZS05MjVmLTczZGY0NDMyNWE1YyIsImlhdCI6MTYwNzE2NDE5NDk0MH0.8XGXSII1IEw9HmntIUsEqMrHYkZX-PKBUPI1JzornEQ",
        },
      })
      .then((res) => {
        // if (res.status === true) {
          const product_list = res.data.data;
          dispatch(getproductSucess(product_list));
        // }
      })
      .catch((err) => {
        const errMsg = err.messages;
        dispatch(getproductError(errMsg));
      });
  };
};
