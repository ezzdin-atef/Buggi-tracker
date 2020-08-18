import React, { Component } from "react";
import axios from "axios";
import "./styles.css";

class Header extends Component {
  state = {
    data: {}
  };
  async componentDidMount() {
    const { data } = await axios.get(
      "https://buggie-tracker-api.herokuapp.com/users/" +
        localStorage.getItem("id")
    );
    // console.log(data);
    this.setState({ data });
  }
  render() {
    return (
      <div className="header">
        <h2 className="header__title">Buggi</h2>
        <div
          data-test-dir="left"
          data-test="header-username"
          className="header__username"
        >
          Hello {this.state.data.username}
        </div>
        <button
          data-test="logout-btn"
          className="btn btn-primary"
          onClick={(e) => {
            localStorage.removeItem("id");
            window.location.reload(false);
          }}
        >
          Logout
        </button>
      </div>
    );
  }
}

export default Header;
