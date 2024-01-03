import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
} from "../../utils/ActionType";
import axios from "axios";

// returns action types
const loginSuccess = (res) => {
  return {
    type: LOGIN_SUCCESS,
    payload: res.data,
  };
};

const loginFailure = (err) => {
  return {
    type: LOGIN_FAILURE,
    payload: err,
  };
};

const logoutSuccess = (err) => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// Hitting end point with user info to login
export const login = (params) => {
  return (dispatch) => {
    axios
      .post("https://netflix-clone-apis.vercel.app/api/v1/login", params)
      .then((res) => {
        dispatch(loginSuccess(res));
      })
      .catch((err) => {
        dispatch(loginFailure(err.response.data.message));
      });
  };
};

// Simple logout action
export const logout = () => {
  return (dispatch) => {
    dispatch(logoutSuccess());
  };
};
