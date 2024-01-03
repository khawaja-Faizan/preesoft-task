import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { login } from "../redux/actions/login.actions";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    let obj = {
      email: email,
      password: password,
    };
    props.login(obj);
  };

  useEffect(() => {
    setError(props.err);
  }, [props.err]);

  return (
    <div className="login-section">
      <div className="login-container">
        <h2>Login</h2>
        <form className="needs-validation" novalidate>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <label for="floatingPassword">Password</label>
          </div>
          <p className="invalid-text">{error}</p>
          <button type="button" onClick={() => handleLogin()}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  login: state.login,
  err: state.login.err,
});

const mapDispacthToProps = (dispatch) => {
  return {
    login: (data) => {
      dispatch(login(data));
    },
  };
};

export default connect(mapStateToProps, mapDispacthToProps)(Login);
