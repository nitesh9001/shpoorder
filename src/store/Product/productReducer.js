import { FETCH_CITY_LIST, FETCH_CITY_ERROR, FETCH_CITY_REQ } from "../types";


const initialState = {
  product_list: [],
  isLoading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CITY_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_CITY_LIST:
      return {
        ...state,
        product_list: action.payload,
        isLoading: false,
        error: action.payload.status,
      };
    case FETCH_CITY_ERROR:
      return {
        ...state,
        product_list: [],
        error: action.error,
      };

    default:
      return state;
  }
};
export default productReducer;
