import { USER_LOGIN, USERS_ERROR, USERS_LOGOUT, USER_LOADING } from "../types";

const initialState = {
  isAuthUser: !!localStorage.getItem("user"),
  user: JSON.parse(localStorage.getItem("user")) || {},
  isLoading: false,
  error: '',
};


const userReducer= (state = initialState, action)=> {
  switch (action.type) {
    case USER_LOADING:
      return { ...state, isLoading: true };
    case USER_LOGIN:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
        isAuthUser: true,
        isLoading: false,
      };
    case USERS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    
    case USERS_LOGOUT:
      localStorage.removeItem("user");
      return { ...state, isAuthUser: false, user: {} };
    default:
      return state;
  }
}
export default userReducer

