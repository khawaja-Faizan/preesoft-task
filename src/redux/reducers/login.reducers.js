import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
} from "../../utils/ActionType";

let token = window.localStorage.getItem("isLoggedIn")
  ? window.localStorage.getItem("isLoggedIn")
  : false;

const initialState = {
  token: token,
  data: "",
  err: "",
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      window.localStorage.setItem("isLoggedIn", action.payload.token);
      return { token: true, data: action.payload.token, err: "" };
    }

    case LOGIN_FAILURE:
      return { token: false, data: "", err: action.payload };

    case LOGOUT_SUCCESS: {
      window.localStorage.clear();
      return { token: false, data: "", err: "" };
    }
    default:
      return state;
  }
};

export default loginReducer;
