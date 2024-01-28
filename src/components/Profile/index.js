import { Component } from "react";
import Cookies from "js-cookie";
import { ThreeCircles } from "react-loader-spinner";
import { MdAccountCircle } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { PiSuitcaseSimpleFill } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { FaMobileAlt } from "react-icons/fa";

import Header from "../Header";
import UploadQuotes from "../UploadQuotes";
import DeleteQuote from "../DeleteQuotes";
import UpdateQuotes from "../UpdateQuotes";

import "./index.css";

const status = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  in_progress: "IN_PROGRESS",
};

class Profile extends Component {
  state = {
    data: [],
    apiStatus: status.initial,
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({ apiStatus: status.in_progress });
    const jwtToken = Cookies.get("jwt_token");
    const url = `http://localhost:3001/profile/`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();

      this.setState({ apiStatus: status.success, data: data });
    } else {
      this.setState({ apiStatus: status.failure });
    }
  };

  renderLoader = () => (
    <div className="loader-container">
      <ThreeCircles type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  );

  renderFail = () => (
    <div className="bookshelves-failed-container">
      <div>
        <img
          src="https://res.cloudinary.com/dkmnh0kwl/image/upload/v1699932471/Group_7522_b4fynz.png"
          alt="failure view"
          className="bookshelves-failed-image"
        />
      </div>
      <p className="failed-para">Something went wrong. Please try again</p>
      <div>
        <button
          type="button"
          className="failed-button"
          onClick={this.retryEvent}
        >
          Try Again
        </button>
      </div>
    </div>
  );

  renderSuccess = () => {
    const { data } = this.state;
    return (
      <>
        <Header />
        <div className="user-profile-container">
          <div className="username-userid-container">
            <p className="userid">UserId:{data.userid}</p>
            <p className="username">{data.username}</p>
          </div>
          <MdAccountCircle className="profile-image" />
          <div className="buttons-container">
            <UploadQuotes className="popup-styles-profile" />
            <UpdateQuotes />
            <DeleteQuote />
          </div>
          <div className="name-and-age-container">
            <p className="name">
              <span>
                <CiUser className="user-icon" />
              </span>
              {data.name}
            </p>
            <p className="age">{data.age}</p>
          </div>
          <div className="location-and-occupation">
            <p className="occupation">
              <PiSuitcaseSimpleFill className="occupation-icon" />
              {data.occupation}
            </p>
            <p className="location">
              <FaLocationDot className="location-icon" />
              {data.location}
            </p>
          </div>
          <div className="mail-and-mobile">
            <p className="mail">
              <CiMail className="mail-icon" />
              {data.mail}
            </p>
            <p className="mobile">
              <FaMobileAlt className="mobile-icon" />
              {data.mobilenumber}
            </p>
          </div>
        </div>

        <div className="user-profile-container-large">
          <div className="profile-card-container">
            <MdAccountCircle className="profile-image" />
            <p className="name">{data.name}</p>
            <p className="occupation">
              <PiSuitcaseSimpleFill className="occupation-icon" />
              {data.occupation}
            </p>
            <p className="location">
              <FaLocationDot className="location-icon" />
              {data.location}
            </p>
            <div className="buttons-container">
              <UploadQuotes className="popup-styles-profile" />
              <UpdateQuotes />
              <DeleteQuote />
            </div>
          </div>
          <div className="user-details-container-large">
            <p className="username">Username : {data.username}</p>
            <p className="userid">UserId : {data.userid}</p>
            <p className="name">Name : {data.name}</p>
            <p className="age">Age : {data.age}</p>
            <p className="location">Location : {data.location}</p>
            <p className="mail">Mail : {data.mail}</p>
            <p className="mobile">Mobile Number : {data.mobilenumber}</p>
          </div>
        </div>
      </>
    );
  };

  renderFinal = () => {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case status.in_progress:
        return this.renderLoader();
      case status.success:
        return this.renderSuccess();
      default:
        return this.renderFail();
    }
  };

  render() {
    return <div>{this.renderFinal()}</div>;
  }
}
export default Profile;
