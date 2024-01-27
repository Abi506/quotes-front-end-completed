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
      mobilenumber,
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
      this.setState({ allDetailsFilled: true });

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
    } = this.state;
    console.log(
      username,
      password,
      name,
      gender,
      location,
      age,
      occupation,
      mail,
      mobilenumber,
      allDetailsFilled
    );

    return (
      <div className="popup-container">
        <Popup
          modal
          trigger={
            <button type="button" className="trigger-button">
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
                    id="username"
                  />
                </div>
                <div className="container-form">
                  <label htmlFor="password" className="common-label">
                    Password
                  </label>
                  <input
                    type="text"
                    className="common-text-box"
                    placeholder="Enter Password"
                    onChange={this.passwordEvent}
                    id="password"
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
                    id="mobilenumber"
                  />
                </div>
                {allDetailsFilled === false && (
                  <p className="details-message">Please Fill all Details</p>
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
