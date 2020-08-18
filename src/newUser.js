import React, { Component } from "react";
import Header from "./header";
import axios from "axios";
import "./styles.css";
import { Link } from "react-router-dom";

class NewUser extends Component {
  state = {
    data: [],
    username: "",
    role: "select",
    username_error: "",
    role_error: ""
  };

  async componentDidMount() {
    const { data } = await axios.get("https://mnqs7.sse.codesandbox.io/users");
    // const data = Object.keys(d).sort(function(a, b) {
    //   return a.username - b.username;
    // });
    this.setState({ data });
  }

  onChange = (e, type) => {
    if (type === "username") {
      const username = e.target.value;
      if (username.length > 10) {
        const username_error = "Username can have max 10 characters";
        this.setState({ username_error });
      } else if (username === "") {
        const username_error = "Username is required";
        this.setState({ username_error });
      } else if (!username.match(/^[0-9a-zA-Z]+$/)) {
        const username_error = "Username can contain only letters and numbersa";
        this.setState({ username_error });
      } else {
        const username_error = "";
        this.setState({ username_error });
      }
      this.setState({ username });
    }
    if (type === "role") {
      const role = e.target.value;
      if (role === "") {
        const role_error = "Role is required";
        this.setState({ role_error });
      } else {
        const role_error = "";
        this.setState({ role_error });
      }
      this.setState({ role });
    }
  };

  onSubmit = async e => {
    e.preventDefault();
    const user = {
      username: this.state.username,
      role: this.state.role
    };
    let username_error = "",
      role_error = "";
    const username = this.state.username;
    if (username.length > 10) {
      username_error = "Username can have max 10 characters";
      this.setState({ username_error });
    } else if (username === "") {
      username_error = "Username is required";
      this.setState({ username_error });
    } else if (!username.match(/^[0-9a-zA-Z]+$/)) {
      username_error = "Username can contain only letters and numbersa";
      this.setState({ username_error });
    }
    // else if (
    //   this.state.data.find(el => el.username === username.toLowerCase())
    // ) {
    //   username_error = "Username is already taken";
    //   this.setState({ username_error });
    // }
    const role = this.state.role;
    if (role === "" || role === "select") {
      role_error = "Role is required";
      this.setState({ role_error });
    }
    if (username_error === "" && role_error === "") {
      axios
        .post("https://mnqs7.sse.codesandbox.io/users", user)
        .then(res => {
          const data = JSON.parse(localStorage.getItem("data"));
          data.push(res.data);
          data.sort((a, b) =>
            a["username"].toLowerCase() > b["username"].toLowerCase() ? 1 : -1
          );
          this.props.history.push("/users");
        })
        .catch(err => {
          username_error = "Username is already taken";
          this.setState({ username_error });
        });
    }
  };
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="page user-page">
          <div
            className="breadcrumb"
            data-test="breadcrumb"
            data-test-dir="top-center"
          >
            <Link data-test="bc-1" data-test-dir="top" to="/">
              Home
            </Link>
            <span className="breadcrumb__separator">&gt;</span>
            <Link data-test="bc-2" data-test-dir="top" to="/users">
              Users
            </Link>
            <span className="breadcrumb__separator">&gt;</span>
            <span data-test="bc-3" data-test-dir="top">
              Add User
            </span>
          </div>
          {this.state.data.length !== 0 && (
            <form className="form" onSubmit={this.onSubmit}>
              <div className="textbox" data-test="username">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  onChange={e => this.onChange(e, "username")}
                />
                {this.state.username_error !== "" && (
                  <div data-test="error" className="error">
                    {this.state.username_error}
                  </div>
                )}
              </div>
              <div className="select" data-test="role">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  onChange={e => this.onChange(e, "role")}
                >
                  <option disabled="" value="" defaultValue>
                    select
                  </option>
                  <option value="admin">admin</option>
                  <option value="owner">owner</option>
                  <option value="reporter">reporter</option>
                </select>
                {this.state.role_error !== "" && (
                  <div data-test="error" className="error">
                    {this.state.role_error}
                  </div>
                )}
              </div>
              <button
                className="btn btn-primary"
                data-test="save-btn"
                type="submit"
                onSubmit={this.onSubmit}
              >
                Save
              </button>
            </form>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default NewUser;
