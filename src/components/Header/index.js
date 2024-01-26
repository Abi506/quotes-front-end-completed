import { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Cookies from "js-cookie";

import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

import "./index.css";

class Header extends Component {
  state = { displayMenu: false };

  changeIcon = () => {
    this.setState((prevState) => ({ displayMenu: !prevState.displayMenu }));
  };

  logoutEvent = () => {
    const { history } = this.props;
    Cookies.remove("jwt_token");
    history.replace("/login");
  };

  render() {
    const { displayMenu } = this.state;
    return (
      <>
        <nav className="nav-container-small">
          <div className="intermediate-container">
            <Link to="/" className="nav-link">
              <div className="website-logo-container">
                <h1 className="logo-heading-header">
                  <span className="logo">Q</span>Quotopia
                </h1>
              </div>
            </Link>
            <div className="hamburger-icon">
              <button type="button" className="hamburgerButton">
                <GiHamburgerMenu
                  className="hamburger-icon"
                  onClick={this.changeIcon}
                />
              </button>
            </div>
          </div>
          {displayMenu === true && (
            <ul className="sections-list">
              <Link to="/" className="nav-link">
                <li className="color1-section-small">Home </li>
              </Link>
              <Link to="/quotes" className="nav-link">
                <li className="color2-section-small">Quotes </li>
              </Link>
              <Link to="/authors" className="nav-link">
                <li className="color1-section-small">Authors </li>
              </Link>
              <Link to="/profile" className="nav-link">
                <li className="color2-section-small">
                  <CgProfile className="color2-section-small" />
                </li>
              </Link>
              <li className="button-list">
                <button
                  type="button"
                  className="logout-button"
                  onClick={this.logoutEvent}
                >
                  Logout
                </button>
              </li>
              <li className="button-list">
                <button type="button" className="close-button">
                  <AiOutlineClose
                    className="close-icon"
                    onClick={this.changeIcon}
                  />
                </button>
              </li>
            </ul>
          )}
        </nav>
        <nav className="nav-container-large">
          <Link to="/" className="nav-link">
            <div className="website-logo-container-header">
              <h1 className="logo-heading-header">
                <span className="logo">Q</span>Quotopia
              </h1>
            </div>
          </Link>
          <ul className="sections-list">
            <Link to="/" className="nav-link">
              <li className="color1-section">Home </li>
            </Link>
            <Link to="/quotes" className="nav-link">
              <li className="color2-section">Quotes</li>
            </Link>
            <Link to="/authors" className="nav-link">
              <li className="color1-section">Authors</li>
            </Link>
            <Link to="/profile" className="nav-link">
              <li className="color2-section">
                <CgProfile className="color2-section" />
              </li>
            </Link>
            <li className="button-list">
              <button
                type="button"
                className="logout-button"
                onClick={this.logoutEvent}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}
export default withRouter(Header);
