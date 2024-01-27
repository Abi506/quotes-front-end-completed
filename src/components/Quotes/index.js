import { Component } from "react";
import { BsSearch } from "react-icons/bs";
import Cookies from "js-cookie";
import { ThreeCircles } from "react-loader-spinner";
import QuotesItem from "../QuotesItem";
import Header from "../Header";
import "./index.css";

const status = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  in_progress: "IN_PROGRESS",
};

class Quotes extends Component {
  state = {
    data: [],
    search_text: "",
    apiStatus: status.initial,
  };

  componentDidMount() {
    this.getData();
  }

  searchInput = (event) => {
    this.setState({ search_text: event.target.value });
  };

  searchIconPressed = () => {
    this.setState(() => {
      this.getData();
    });
  };

  getData = async () => {
    const { search_text } = this.state;
    this.setState({ apiStatus: status.in_progress });
    const jwtToken = Cookies.get("jwt_token");
    const url = `http://localhost:3001/all-quotes?search=${search_text}`;
    console.log(url, "url");
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      console.log(data, "data");
      const formattedData = data.map((each) => ({
        quote: each.quote,
        explanation: each.explanation,
        author: each.author,
        id: each.id,
      }));
      this.setState({ apiStatus: status.success, data: formattedData });
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
    const { data } = this.state;

    return (
      <>
        <Header />
        <div className="quotes-container">
          <div className="input-container">
            <input
              type="search"
              className="input-box"
              onChange={this.searchInput}
              placeholder="Search"
            />
            <div className="search-icon-container">
              <button
                className="search-button"
                type="button"
                onClick={this.searchIconPressed}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
          </div>
          <QuotesItem details={data} />
        </div>
      </>
    );
  }
}
export default Quotes;
