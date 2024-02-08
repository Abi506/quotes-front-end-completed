import { Component } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import ReactPopUp from "../Register";
import Url from "../../config";

import "./index.css";

class Login extends Component {
  state = {
    username: "",
    password: "",
    isError: false,
    errorMsg: "",
    redirectToHome: false,
    showPassword:false
  };
  userNameEvent = (event) => {
    this.setState({ username: event.target.value });
  };

  passwordEvent = (event) => {
    this.setState({ password: event.target.value });
  };

  onShowPasswordEvent=()=>{
    const{showPassword}=this.state
    this.setState({showPassword:!showPassword})
  }

  onSubmitSuccess = (jwtToken) => {
    const { history } = this.props;
    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
    });
    history.replace("/");
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ isError: true, errorMsg });
    console.log((errorMsg),'here')
  };

  submitEvent = async (event) => {
    event.preventDefault();

    const { username, password } = this.state;
    const userDetails = { username, password };

    const apiUrl = `${Url}/login/`;
    const method = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(apiUrl, method);
    const data = await response.json();

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwtToken);
    } else if (response.ok === false) {
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

  renderPassword = () => {
    const{showPassword,password}=this.state
    return(
      <>
    <div className="password-container">
      <label htmlFor="password" className="password-label-styles">
        Password*
      </label>
      {showPassword===false && (<input
        type="password"
        onChange={this.passwordEvent}
        className="password-input-box"
        placeholder="Enter Password"
        value={password}
        id="password"
      />)}
      {showPassword===true && (<input
        type="text"
        onChange={this.passwordEvent}
        className="password-input-box"
        value={password}
        placeholder="Enter Password"
        id="password"
      />)}
    </div>
    <div className="checkbox-container">
        <input type='checkbox' className="checkbox" id='checkbox' onChange={this.onShowPasswordEvent}/>
        <label className="show-password" htmlFor="checkbox">Show Password</label>
      </div>
    </>
  );
    }
  render() {
    const { isError, errorMsg,showPassword } = this.state;
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined) {
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
            {isError && <p className="error-message-styles">*{errorMsg}</p>}
            <div className="login-button-container">
              <button type="submit" className="login-button-styles">
                Login
              </button>
            </div>
            <ReactPopUp className="popup-styles" />
          </div>
        </form>
      </div>
    );
  }
}
export default Login;
