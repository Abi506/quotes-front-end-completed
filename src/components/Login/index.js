import { Component } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

import "./index.css";

class Login extends Component {
  state = { username: "", password: "", isError: false, errorMsg: "" };
  userNameEvent = (event) => {
    this.setState({ username: event.target.value });
  };

  passwordEvent = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitSuccess = (jwtToken) => {
    const { history } = this.props;
    console.log(jwtToken, "success");
    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
    });
    history.replace("/");
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ isError: true, errorMsg });
  };

  submitEvent = async (event) => {
    event.preventDefault();

    const { username, password } = this.state;
    const userDetails = { username, password };
    console.log(userDetails, "userdetails");
    const apiUrl = "http://localhost:3001/login/";
    const method = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    console.log(JSON.stringify(userDetails));
    const response = await fetch(apiUrl, method);
    const data = await response.json();
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwtToken);
    } else {
      this.onSubmitFailure(data.error_msg);
    }
  };

  renderUserName = () => (
    <div className="username-container">
      <label htmlFor="username" className="username-label-styles">
        Username*
      </label>
      <input
        type="text"
        id="username"
        onChange={this.userNameEvent}
        className="username-input-box"
        placeholder="Enter Username"
      />
    </div>
  );

  renderPassword = () => (
    <div className="password-container">
      <label htmlFor="password" className="password-label-styles">
        Password*
      </label>
      <input
        type="password"
        onChange={this.passwordEvent}
        className="password-input-box"
        placeholder="Enter Password"
        id="password"
      />
    </div>
  );

  render() {
    const { isError, errorMsg } = this.state;
    const jwtToken = Cookies.get("jwt_token");
    console.log(jwtToken, "jwtToken login");
    if (jwtToken !== undefined) {
      console.log("success");
      return <Redirect to="/" />;
    }
    return (
      <div className="main-login-container">
        <div className="login-main-image-container">
          <img
            src="https://res.cloudinary.com/dkmnh0kwl/image/upload/v1706248931/quotes_co6ipw.avif"
            alt="website login"
            className="main-image-small"
          />

          <img
            src="https://res.cloudinary.com/dkmnh0kwl/image/upload/v1706248931/quotes_co6ipw.avif"
            alt="website login"
            className="main-image-large"
          />
        </div>
        <form className="login-form" onSubmit={this.submitEvent}>
          <div className="login-form-container">
            <div className="website-logo-container">
              <h1 className="logo-heading">
                <span className="logo">Q</span>Quotopia
              </h1>
            </div>
            <div className="username-field">{this.renderUserName()}</div>
            <div className="password-field">{this.renderPassword()}</div>
            {isError && <p className="error-message-styles">{errorMsg}</p>}
            <div className="login-button-container">
              <button type="submit" className="login-button-styles">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default Login;
