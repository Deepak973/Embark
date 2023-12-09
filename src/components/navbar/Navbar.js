import React from "react";
import ConnectButtonCustom from "../connect-button/ConnectButtonCustom";
import "../navbar/Navbar.css";
import logo from "../../assests/logo.svg";
import User from "../../assests/user.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
          <a class="navbar-brand navbar-logo" href="/">
            {/* <img src={logo} className="logo-img" /> */}
            <div style={{ color: "white", fontSize: "1.5rem" }}>EMBARK</div>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <form class="d-flex">
              <Link to="/user-profile">
                <img src={User} className="user-img"></img>
              </Link>
              <i className="fas fa-user-circle"></i>
              <ConnectButtonCustom />
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
