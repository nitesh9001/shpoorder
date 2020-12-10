import { USER_LOGIN, USERS_ERROR, USERS_LOGOUT, USER_LOADING } from "../types";

export const getLoginReq = () => {
  return {
    type: USER_LOADING,
  };
};

export const getloginData = (user) => {
  return {
    type: USER_LOGIN,
    payload: user,
  };
};

export const getLoginError = (error) => {
  return {
    type: USERS_ERROR,
    payload: error,
  };
};

export const getUsers = (username, password,role) => {
  return (dispatch) => {
    dispatch(getLoginReq);
    try {
      if(role==="admin"){
      if (username === "admin@admin.com" && password === "admin") {
        localStorage.setItem("role", "admin");
        localStorage.setItem(
          "superadmin_auth",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc2ZTUzODAwLWJlNTgtNGZmMC1iYTQxLTZkNGYzMjVmMmU4NyIsImlhdCI6MTYwMjM2ODk3NjYzNH0.IwR-Vo-4UQ36f50UjwaIk21cC3ZFB_QgnHbsRPO45Ow"
        );
        localStorage.setItem("superadmin_name", "Super Admin");
        // localStorage.setItem("superadmin_name", json.result.userName)
        // localStorage.setItem("superadmin_uid", json.result.id)
        // localStorage.setItem("superadmin_uid", json.result.adminId);
        // localStorage.setItem("superadmin_email", json.result.email)
        localStorage.setItem("superadmin_email", "admin@admin.com");
        
        const user = {
          role: "admin",
          id: "5",
          name: "rahul",
          email: "admin@admin.com",
        };
        dispatch(getloginData(user));
      }
    }
    else{
      if(role==="seller"){
        if (username === "admin@seller.com" && password === "seller") {
          localStorage.setItem("role","seller");
          localStorage.setItem(
            "superadmin_auth",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc2ZTUzODAwLWJlNTgtNGZmMC1iYTQxLTZkNGYzMjVmMmU4NyIsImlhdCI6MTYwMjM2ODk3NjYzNH0.IwR-Vo-4UQ36f50UjwaIk21cC3ZFB_QgnHbsRPO45Ow"
          );
          localStorage.setItem("superadmin_name", "Seller Admin");
          // localStorage.setItem("superadmin_name", json.result.userName)
          // localStorage.setItem("superadmin_uid", json.result.id)
          // localStorage.setItem("superadmin_uid", json.result.adminId);
          // localStorage.setItem("superadmin_email", json.result.email)
          localStorage.setItem("superadmin_email", "admin@seller.com");
          const user = {
            role: "seller",
            id: "5",
            name: "rahul",
            email: "admin@seller.com",
          };
          dispatch(getloginData(user));
        }
      }
    }

    } catch (error) {
      const errMsg = error.message;
      dispatch(getLoginError(errMsg));
    }
  };
};
export const logoutUser = () => (dispatch) => {
  localStorage.clear();
  return {
    type: USERS_LOGOUT,
    payload: dispatch,
  };
  // setAuthToken(false);
};
