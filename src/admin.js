import React, { Component } from "react";
import "./styles.css";
import { Link } from "react-router-dom";

class Admin extends Component {
  render() {
    return (
      <React.Fragment>
        <Link
          className="home-page__card"
          to="/users"
          data-test="home-card-users"
          data-test-dir="top-center"
        >
          Users
        </Link>
      </React.Fragment>
    );
  }
}

export default Admin;
