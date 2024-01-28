import { Component } from "react";
import Popup from "reactjs-popup";

import "reactjs-popup/dist/index.css";

import "./index.css";

class ReactPopUp extends Component {
  state = {
    username: "",
    password: "",
    name: "",
    gender: "Male",
    location: "",
    age: "",
    occupation: "",
    mail: "",
    mobilenumber: "",
    allDetailsFilled: true,
    accountCreated: false,
    confirmPassword: "",
    passwordMisMatch: false,
  };

  usernameEvent = (event) => {
    this.setState({ username: event.target.value });
  };
  passwordEvent = (event) => {
    this.setState({ password: event.target.value });
  };
  nameEvent = (event) => {
    this.setState({ name: event.target.value });
  };

  submitEvent = async (event) => {
    event.preventDefault();
    const {
      username,
      password,
      name,
      gender,
      location,
      age,
      occupation,
      mail,
      passwordMisMatch,
      mobilenumber,
      confirmPassword,
      allDetailsFilled,
    } = this.state;
    const userDetails = {
      username,
      password,
      name,
      gender,
      location,
      age,
      occupation,
      mail,
      mobilenumber,
    };
    if (password !== confirmPassword) {
      this.setState({ passwordMisMatch: true });
      return;

      if (
        username === "" ||
        password === "" ||
        name === "" ||
        gender === "" ||
        location === "" ||
        age === "" ||
        occupation === "" ||
        mail === "" ||
        mobilenumber === ""
      ) {
        // If any of the fields are empty, set allDetailsFilled to false
        this.setState({ allDetailsFilled: false });
        console.log("Please fill in all required fields");
      }
    } else {
      const apiUrl = `http://localhost:3001/register/`;
      const method = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(apiUrl, method);
      console.log(response, "register response");
      this.setState({
        allDetailsFilled: true,
        username: "",
        password: "",
        name: "",
        gender: "",
        location: "",
        age: "",
        occupation: "",
        mail: "",
        mobilenumber: "",
        accountCreated: true,
        passwordMisMatch: false,
      });

      console.log("All fields filled, form submitted");
    }
  };

  genderEvent = (event) => {
    this.setState({ gender: event.target.value });
  };
  locationEvent = (event) => {
    this.setState({ location: event.target.value });
  };
  ageEvent = (event) => {
    this.setState({ age: event.target.value });
  };
  occupationEvent = (event) => {
    this.setState({ occupation: event.target.value });
  };
  mailEvent = (event) => {
    this.setState({ mail: event.target.value });
  };
  mobilenumberEvent = (event) => {
    this.setState({ mobilenumber: event.target.value });
  };

  confirmPasswordEvent = (event) => {
    this.setState({ confirmPassword: event.target.value });
  };

  render() {
    const {
      username,
      password,
      name,
      gender,
      location,
      age,
      occupation,
      mail,
      mobilenumber,
      allDetailsFilled,
      accountCreated,
      confirmPassword,
      passwordMisMatch,
    } = this.state;

    return (
      <div className="popup-container">
        <Popup
          modal
          trigger={
            <button type="button" className="trigger-button-register">
              <a href="#">Don't have an account? Sign up</a>
            </button>
          }
        >
          {(close) => (
            <>
              <form className="registration-form" onSubmit={this.submitEvent}>
                <h1 className="register-heading">Register</h1>
                <div className="container-form">
                  <label htmlFor="username" className="common-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="common-text-box"
                    placeholder="Enter Username"
                    onChange={this.usernameEvent}
                    value={username}
                    id="username"
                  />
                </div>
                <div className="container-form">
                  <label htmlFor="password" className="common-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="common-text-box"
                    placeholder="Enter Password"
                    onChange={this.passwordEvent}
                    id="password"
                    value={password}
                  />
                </div>
                <div className="container-form">
                  <label htmlFor="confirm-password" className="common-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="common-text-box"
                    placeholder="Enter Password"
                    id="confirm-password"
                    onChange={this.confirmPasswordEvent}
                    value={confirmPassword}
                  />
                </div>
                <div className="container-form">
                  <label htmlFor="name" className="common-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="common-text-box"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={this.nameEvent}
                    id="name"
                  />
                </div>
                <div className="container-form">
                  <label htmlFor="gender" className="common-label">
                    Gender
                  </label>
                  <select
                    id="gender"
                    className="common-text-box"
                    onChange={this.genderEvent}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="container-form">
                  <label htmlFor="location" className="common-label">
                    Location
                  </label>
                  <input
                    type="text"
                    className="common-text-box"
                    placeholder="Enter Your Location"
                    onChange={this.locationEvent}
                    value={location}
                    id="location"
                  />
                </div>
                <div className="container-form">
                  <label htmlFor="age" className="common-label">
                    Age
                  </label>
                  <input
                    type="text"
                    className="common-text-box"
                    placeholder="Enter Your Age"
                    value={age}
                    onChange={this.ageEvent}
                    id="age"
                  />
                </div>
                <div className="container-form">
                  <label htmlFor="occupation" className="common-label">
                    Occupation
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Your Occupation"
                    onChange={this.occupationEvent}
                    className="common-text-box"
                    id="occupation"
                    value={occupation}
                  />
                </div>
                <div className="container-form">
                  <label htmlFor="mail" className="common-label">
                    Mail
                  </label>
                  <input
                    type="text"
                    className="common-text-box"
                    placeholder="Enter Your Email"
                    onChange={this.mailEvent}
                    value={mail}
                    id="mail"
                  />
                </div>
                <div className="container-form">
                  <label htmlFor="mobilenumber" className="common-label">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    className="common-text-box"
                    placeholder="Enter Your Mobile Number"
                    onChange={this.mobilenumberEvent}
                    value={mobilenumber}
                    id="mobilenumber"
                  />
                </div>
                {allDetailsFilled === false && (
                  <p className="details-message">Please Fill all Details</p>
                )}
                {accountCreated === true && (
                  <p className="account-created-message">
                    Account Created Successfully
                  </p>
                )}
                {passwordMisMatch === true && (
                  <p className="details-message">Password Mismatch</p>
                )}
                <div className="submit-container">
                  <button
                    type="button"
                    onClick={this.submitEvent}
                    className="register-submit-button"
                  >
                    Submit
                  </button>
                </div>
              </form>
              <button
                type="button"
                className="trigger-button"
                onClick={() => close()}
              >
                Close
              </button>
            </>
          )}
        </Popup>
      </div>
    );
  }
}
export default ReactPopUp;
