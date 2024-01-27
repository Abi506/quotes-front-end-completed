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
};

class QuoteItemDetails extends Component {
  state = { data: [], apiStatus: status.initial };

  componentDidMount() {
    this.getData();
  }

  retryEvent = () => {
    this.getData();
  };

  getData = async () => {
    this.setState({ apiStatus: status.in_progress });
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const jwtToken = Cookies.get("jwt_token");
    console.log(jwtToken, "jwhere");
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };

    const apiUrl = `http://localhost:3001/all-quotes/${id}`;
    const response = await fetch(apiUrl, options);
    if (response.ok) {
      const data = await response.json();
      const formattedData = {
        author: data.author,
        id: data.id,
        explanation: data.explanation,
        quote: data.quote,
      };
      console.log(formattedData, "formattedData");
      this.setState({ data: formattedData, apiStatus: status.success });
    } else {
      this.setState({ apiStatus: status.failure });
    }
  };

  renderLoader = () => (
    <div className="loader-container">
      <ThreeCircles type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  );

  renderSuccess = () => {
    const { data } = this.state;
    const { author, explanation, id, quote } = data;

    return (
      <div className="QuotesItemDetails-container">
        <h1>"{quote}"</h1>
        <p className="author-name">- {author}</p>
        <p>{explanation}</p>
      </div>
    );
  };

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
    return (
      <>
        <Header />
        <div className="QuotesItemsDetails-container">
          <div>{this.renderFinal()}</div>
        </div>
      </>
    );
  }
}
export default QuoteItemDetails;
