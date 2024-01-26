import { Component } from "react";
import Cookies from "js-cookie";
import { FaGoogle, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { ThreeCircles } from "react-loader-spinner";
import Header from "../Header";

import "./index.css";

const status = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  in_progress: "IN_PROGRESS",
};

class Home extends Component {
  state = { data: [], apiStatus: status.initial };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({ apiStatus: status.in_progress });
    const jwtToken = Cookies.get("jwt_token");
    console.log(jwtToken, "jwtoken");
    const url = `http://localhost:3001/top-quotes/`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };

    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      //console.log(data, "data");
      const formattedData = data.map((each) => ({
        author: each.author,
        explanation: each.explanation,
        id: each.id,
        quote: each.quote,
      }));
      console.log(formattedData, "formatted data");
      this.setState({ apiStatus: status.success, data: formattedData });
    } else {
      this.setState({ apiStatus: status.failure });
    }
  };

  retryEvent = () => {
    this.getData();
  };

  searchQuotes = () => {
    const { history } = this.props;
    history.replace("/quotes");
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

  renderFinal = () => {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case status.in_progress:
        return this.renderLoader();
      default:
        return null;
    }
  };

  render() {
    const { data, apiStatus } = this.state;
    return (
      <>
        <Header />
        <div>
          {this.renderFinal()}
          {apiStatus === status.success && (
            <div className="home-container">
              <h1 className="home-heading">
                Discover Your Next Favorite Quotes!
              </h1>
              <p className="home-para">
                Discover meaningful quotes for every mood and moment on our
                inspirational quote website. Share wisdom, motivation, and joy
                with curated collections tailored to your taste. Your next
                favorite quotes are just a click away!
              </p>
              <div className="home-button-container">
                <button
                  type="button"
                  className="search-quotes-button"
                  onClick={this.searchQuotes}
                >
                  Search Quotes
                </button>
              </div>
              <div className="top-quotes-container">
                <h1 className="top-quotes-heading">Top Quotes</h1>
                <ul className="top-quotes-list">
                  {data.map((each) => (
                    <li key={each.id} className="top-quotes-each-list">
                      {each.quote}
                      <span className="each-author">-{each.author}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}
export default Home;
