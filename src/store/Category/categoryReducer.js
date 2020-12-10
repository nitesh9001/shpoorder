import { FETCH_CATG_ERROR, FETCH_CATG_LIST, FETCH_CATG_REQ } from "../types";

const initialState = {
  category_list: [],
  isLoading: false,
  error: null,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATG_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_CATG_LIST:
      return {
        ...state,
        category_list: action.payload,
        isLoading: false,
        error: action.payload.status,
      };
    case FETCH_CATG_ERROR:
      return {
        ...state,
        category_list: [],
        error: action.error,
      };

    default:
      return state;
  }
};
export default categoryReducer;
