import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../view/Login";

const ProtectedRoute = (props) => {
  const [auth, setAuth] = useState(window.localStorage.getItem("isLoggedIn"));

  useEffect(() => {
    setAuth(props.login.token);
  }, [props.login]);

  return auth ? <Outlet /> : <Login />;
};
const mapStateToProps = (state) => ({
  login: state.login,
});

export default connect(mapStateToProps, null)(ProtectedRoute);
