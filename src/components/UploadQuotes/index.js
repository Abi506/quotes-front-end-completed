import { Component } from "react";
import Cookies from "js-cookie";
import Popup from "reactjs-popup";

import "reactjs-popup/dist/index.css";

import "./index.css";

class UploadQuotes extends Component {
  state = { userid: "", quote: "", explanation: "", allDetailsFilled: true };

  useridEvent = (event) => {
    this.setState({ userid: event.target.value });
  };

  quoteEvent = (event) => {
    this.setState({ quote: event.target.value });
  };
  explanationEvent = (event) => {
    this.setState({ explanation: event.target.value });
  };

  submitEvent = async (event) => {
    event.preventDefault();
    const { userid, quote, explanation } = this.state;
    const userDetails = { userid, quote, explanation };

    if (userid === "" || quote === "" || explanation === "") {
      this.setState({ allDetailsFilled: false });
      console.log("Please fill in all required fields");
    } else {
      const apiUrl = `http://localhost:3001/my-quotes/`;
      const jwtToken = Cookies.get("jwt_token");
      const method = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(apiUrl, method);
      console.log(response, "upload response");

      this.setState({
        allDetailsFilled: true,
        userid: "",
        quote: "",
        explanation: "",
      });
      console.log("All fields filled, form submitted");
    }
  };

  render() {
    const { userid, explanation, quote } = this.state;
    return (
      <div className="popup-container">
        <Popup
          modal
          trigger={
            <button type="button" className="upload-button">
              Upload Quotes
            </button>
          }
          className="custom-popup"
        >
          {(close) => (
            <>
              <form className="quotes-upload-form" onSubmit={this.submitEvent}>
                <h1 className="upload-quotes">Upload Quotes</h1>
                <div className="container-form">
                  <label htmlFor="userid" className="common-label">
                    UserId
                  </label>
                  <input
                    type="text"
                    className="common-text-box"
                    value={userid}
                    placeholder="Enter Userid"
                    onChange={this.useridEvent}
                    id="userid"
                  />
                </div>
                <div className="container-form">
                  <label htmlFor="quote" className="common-label">
                    Quote
                  </label>
                  <input
                    type="text"
                    className="common-text-box"
                    value={quote}
                    placeholder="Enter Your QUote"
                    onChange={this.quoteEvent}
                    id="quote"
                  />
                </div>
                <div className="container-form">
                  <label htmlFor="explanation" className="common-label">
                    Explanation
                  </label>
                  <input
                    type="text"
                    className="common-text-box"
                    placeholder="Enter Explanation of Your Quote"
                    onChange={this.explanationEvent}
                    value={explanation}
                    id="userid"
                  />
                </div>
                <div className="button-container">
                  <button
                    type="button"
                    className="register-submit-button"
                    onClick={this.submitEvent}
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
export default UploadQuotes;
