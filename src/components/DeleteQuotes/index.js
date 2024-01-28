import { Component } from "react";
import Cookies from "js-cookie";
import Popup from "reactjs-popup";

import "reactjs-popup/dist/index.css";

import "./index.css";

class DeleteQuotes extends Component {
  state = { quoteid: "", allDetailsFilled: true, submitEventSuccess: false };

  quoteidEvent = (event) => {
    this.setState({ quoteid: event.target.value });
  };

  submitEvent = async (event) => {
    event.preventDefault();
    const { quoteid } = this.state;

    if (quoteid === "") {
      this.setState({ allDetailsFilled: false });
    } else {
      this.setState({
        allDetailsFilled: true,
        quoteid: "",
        submitEventSuccess: true,
      });
      const apiUrl = "http://localhost:3001/my-quotes/";
      const jwtToken = Cookies.get("jwt_token");
      const userDetails = { quoteid };
      const method = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(apiUrl, method);
      console.log(response, "response");
    }
  };

  render() {
    const { quoteid, submitEventSuccess, allDetailsFilled } = this.state;
    return (
      <div className="popup-container">
        <Popup
          modal
          trigger={
            <button type="button" className="upload-update-button">
              Delete Quotes
            </button>
          }
          className="custom-popup"
        >
          {(close) => (
            <>
              <form className="quotes-upload-form" onSubmit={this.submitEvent}>
                <h1>Delete Quote</h1>
                <div className="container-form">
                  <label htmlFor="userid" className="common-label">
                    Quote Id
                  </label>
                  <input
                    type="text"
                    className="common-text-box"
                    value={quoteid}
                    placeholder="Enter Quote Id to Delete"
                    onChange={this.quoteidEvent}
                    id="userid"
                  />
                </div>
                {allDetailsFilled === false && (
                  <p className="fill-all-details">Fill All Details</p>
                )}
                {submitEventSuccess === true && (
                  <p className="quote-deleted-message-success">
                    Quote Deleted Successfully
                  </p>
                )}
                <div>
                  <button
                    type="button"
                    className="register-submit-button"
                    onClick={this.submitEvent}
                  >
                    Confirm
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
export default DeleteQuotes;
