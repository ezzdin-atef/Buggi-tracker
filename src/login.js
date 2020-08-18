import React, { Component } from "react";
import axios from "axios";
import "./styles.css";

class Login extends Component {
  state = {
    data: [],
    errors: {
      username: "",
      password: "",
      exist: false
    },
    username: "",
    password: ""
  };

  // async componentDidMount() {
  //   const { data } = await axios.get("https://buggie-tracker-api.herokuapp.com/users");
  //   console.log(data);
  //   this.setState({ data });
  // }

  onChange = (input, e) => {
    if (input === "username") {
      this.setState({ username: e.target.value });
      if (e.target.value === "") {
        const errors = { ...this.state.errors };
        errors.username = "Username is required";
        this.setState({ errors });
      } else {
        const errors = { ...this.state.errors };
        errors.username = "";
        this.setState({ errors });
      }
    }
    if (input === "password") {
      this.setState({ password: e.target.value });
      if (e.target.value === "") {
        const errors = { ...this.state.errors };
        errors.password = "Password is required";
        this.setState({ errors });
      } else {
        const errors = { ...this.state.errors };
        errors.password = "";
        this.setState({ errors });
      }
    }
  };

  onsubmit = async (e) => {
    e.preventDefault();
    const credination = {
      username: this.state.username,
      password: this.state.password
    };

    if (credination.username === "" || credination.password === "") {
      const errors = { ...this.state.errors };
      if (credination.username === "") errors.username = "Username is required";
      if (credination.password === "") errors.password = "Password is required";
      this.setState({ errors });
      return 0;
    }

    let id = "";
    const { data } = await axios.post(
      "https://buggie-tracker-api.herokuapp.com/users/login",
      credination
    );
    if (data.username) {
      id = data._id;
    }

    // this.state.data.forEach(el => {
    //   if (
    //     el.username === credination.username &&
    //     el.password === credination.password
    //   ) {
    //     logged = true;
    //     role = el.role;
    //   }
    // });

    if (id !== "") {
      localStorage.setItem("id", id);
      this.props.update();
    } else {
      const errors = { ...this.state.errors };
      errors.exist = true;
      this.setState({ errors });
    }
  };

  render() {
    return (
      <div className="login-page">
        <h1>Buggi Login</h1>
        <form className="form" onSubmit={this.onsubmit}>
          {this.state.errors.exist && (
            <div data-test="login-error" className="alert">
              Authentication failed
            </div>
          )}
          <div className="textbox" data-test="username">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              onChange={(e) => this.onChange("username", e)}
            />
            {this.state.errors.username !== "" && (
              <div data-test="error" className="error">
                {this.state.errors.username}
              </div>
            )}
          </div>
          <div className="textbox" data-test="password">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={(e) => this.onChange("password", e)}
            />
            {this.state.errors.password !== "" && (
              <div data-test="error" className="error">
                {this.state.errors.password}
              </div>
            )}
          </div>
          <button
            className="btn btn-primary"
            data-test="login-btn"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
