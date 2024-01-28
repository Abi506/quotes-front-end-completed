import { Component } from "react";
import Cookies from "js-cookie";
import { ThreeCircles } from "react-loader-spinner";

import Header from "../Header";
import "./index.css";

const status = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  in_progress: "IN_PROGRESS",
  no_quotes: "NO_QUOTES",
};

class MyQuotes extends Component {
  state = {
    data: [],
    apiStatus: status.initial,
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const { author } = this.state;
    this.setState({ apiStatus: status.in_progress });
    const jwtToken = Cookies.get("jwt_token");
    const url = `http://localhost:3001/my-quotes/`;
    console.log(url, "here");
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const response = await fetch(url, options);
    console.log(response, "response");
    if (response.ok) {
      const data = await response.json();
      const formattedData = data.map((each) => ({
        quoteid: each.quoteid,
        quote: each.quote,
        explanation: each.explanation,
      }));
      console.log(data, "formatted Data");
      if (data.length < 1) {
        this.setState({ apiStatus: status.no_quotes, data: formattedData });
      } else {
        this.setState({ apiStatus: status.success, data: formattedData });
      }
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

  renderNoQuotesUploaded = () => {
    return (
      <>
        <Header />
        <div className="no-quotes-container">
          <h1 className="no-quotes-heading">You Haven't Uploaded Quotes</h1>
          <p>Upload Quotes in the profile section</p>
        </div>
      </>
    );
  };

  renderSuccess = () => {
    const { data } = this.state;

    return (
      <>
        <Header />
        <div className="user-quotes-container">
          <ul className="user-uploaded-quotes-list">
            {data.map((each) => (
              <li className="each-quotes-items">
                <h1 className="all-quotes-my-quote">{each.quote}</h1>
                <p className="all-quotes-explanation">{each.explanation}</p>
              </li>
            ))}
          </ul>
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
      case status.no_quotes:
        return this.renderNoQuotesUploaded();
      default:
        return this.renderFail();
    }
  };

  render() {
    return <div>{this.renderFinal()}</div>;
  }
}
export default MyQuotes;
