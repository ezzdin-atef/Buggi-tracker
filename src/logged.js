import React, { Component } from "react";
import axios from "axios";
import Admin from "./admin";
import Header from "./header";
import "./styles.css";
import { Link } from "react-router-dom";

class Logged extends Component {
  state = {
    logged: "",
    role: ""
  };
  async componentDidMount() {
    const { data } = await axios.get(
      "https://buggie-tracker-api.herokuapp.com/users/" +
        localStorage.getItem("id")
    );
    // console.log(data);
    localStorage.setItem("role", data.role);
    localStorage.setItem("username", data.username);
    this.setState({ logged: data.username, role: data.role });
  }
  render() {
    const { role } = this.state;
    return (
      <div>
        <Header update={this.props.update} {...this.props} />
        {role !== "" && (
          <div className="home-page">
            {role === "admin" && <Admin />}
            <Link
              data-test="home-card-projects"
              data-test-dir="top-center"
              class="home-page__card"
              to="/projects"
            >
              Projects
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default Logged;
