import { Component } from "react";
import Cookies from "js-cookie";
import Popup from "reactjs-popup";

import "reactjs-popup/dist/index.css";

import "./index.css";

class UpdateQuotes extends Component {
  state = {
    quoteid: "",
    quote: "",
    explanation: "",
    allDetailsFilled: true,
    updatedSuccessfully: false,
  };

  quoteidEvent = (event) => {
    this.setState({ quoteid: event.target.value });
  };

  quoteEvent = (event) => {
    this.setState({ quote: event.target.value });
  };
  explanationEvent = (event) => {
    this.setState({ explanation: event.target.value });
  };

  submitEvent = async (event) => {
    event.preventDefault();
    const { quoteid, quote, explanation } = this.state;
    const userDetails = { quoteid, quote, explanation };

    if (quoteid === "" || quote === "" || explanation === "") {
      this.setState({ allDetailsFilled: false });
    } else {
      const apiUrl = `http://localhost:3001/my-quotes/`;
      const jwtToken = Cookies.get("jwt_token");
      const method = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(apiUrl, method);

      this.setState({
        allDetailsFilled: true,
        quoteid: "",
        quote: "",
        explanation: "",
        updatedSuccessfully: true,
      });
    }
  };

  render() {
    const {
      quoteid,
      explanation,
      quote,
      allDetailsFilled,
      updatedSuccessfully,
    } = this.state;
    return (
      <div className="popup-container">
        <Popup
          modal
          trigger={
            <button type="button" className="upload-button">
              Update Quotes
            </button>
          }
          className="custom-popup"
        >
          {(close) => (
            <>
              <form className="quotes-upload-form" onSubmit={this.submitEvent}>
                <h1 className="upload-quotes">Upload Quotes</h1>
                <div className="container-form">
                  <label htmlFor="quoteid" className="common-label">
                    Quote Id
                  </label>
                  <input
                    type="text"
                    className="common-text-box"
                    value={quoteid}
                    placeholder="Enter Userid"
                    onChange={this.quoteidEvent}
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
                    placeholder="Enter QUote To Update"
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
                {updatedSuccessfully === true && (
                  <p className="quotes-uploaded-message">
                    Quote Updated Successfully
                  </p>
                )}
                {allDetailsFilled === false && (
                  <p className="fill-all-details">Fill All Details</p>
                )}
                <div className="button-container">
                  <button
                    type="button"
                    className="register-submit-button"
                    onClick={this.submitEvent}
                  >
                    Update
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
export default UpdateQuotes;
