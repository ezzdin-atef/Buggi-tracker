import React, { Component } from "react";
import Header from "./header";
import axios from "axios";
import "./styles.css";
import { Link } from "react-router-dom";

class Users extends Component {
  state = {
    data: [],
    logged: "",
    role: "",
    model: false,
    delete: 0,
    username: ""
  };

  async componentDidMount() {
    const { data } = await axios.get(
      "https://buggie-tracker-api.herokuapp.com/users"
    );
    // const data = Object.keys(d).sort(function(a, b) {
    //   return a.username - b.username;
    // });
    // data.sort(function(a, b) {
    //   return a.username - b.username;
    // });
    data.sort((a, b) =>
      a["username"].toLowerCase() > b["username"].toLowerCase() ? 1 : -1
    );
    localStorage.setItem("data", JSON.stringify(data));
    this.setState({ data });
    const { data: user } = await axios.get(
      "https://buggie-tracker-api.herokuapp.com/users/" +
        localStorage.getItem("id")
    );
    this.setState({ logged: user.username, role: user.role });
  }

  onDelete = async () => {
    this.setState({ data: [] });
    await axios.delete(
      "https://buggie-tracker-api.herokuapp.com/users/" + this.state.delete
    );
    const { data } = await axios.get(
      "https://buggie-tracker-api.herokuapp.com/users"
    );
    // const data = Object.keys(d).sort(function(a, b) {
    //   return a.username - b.username;
    // });
    data.sort((a, b) =>
      a["username"].toLowerCase() > b["username"].toLowerCase() ? 1 : -1
    );
    this.setState({ model: false, delete: 0, data, username: "" });
  };

  render() {
    return (
      <div>
        {this.state.model && (
          <React.Fragment>
            <div className="alpha" />
            <div className="modal">
              <div className="modal__content" data-test="modal">
                <h2 className="modal__title">Confirm</h2>
                <div className="modal__desc">
                  <span data-test="desc">
                    Are you sure to delete "{this.state.username}"?
                  </span>
                </div>
                <div className="modal__buttons">
                  <button
                    data-test="yes-btn"
                    className="btn btn-primary"
                    onClick={this.onDelete}
                  >
                    Yes
                  </button>
                  <button
                    data-test="no-btn"
                    className="btn btn-primary"
                    onClick={() => {
                      this.setState({ model: false, delete: 0 });
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
        <Header {...this.props} />
        {this.state.data.length !== 0 && (
          <div className="page users-page">
            <div
              className="breadcrumb"
              data-test="breadcrumb"
              data-test-dir="top-center"
            >
              <Link data-test="bc-1" data-test-dir="top" to="/">
                Home
              </Link>
              <span className="breadcrumb__separator">&gt;</span>
              <span data-test="bc-2" data-test-dir="top">
                Users
              </span>
            </div>
            <Link
              to="/users/new"
              data-test="add-user-btn"
              className="btn btn-primary"
            >
              + Add User
            </Link>
            <table className="table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map((el, ind) => (
                  <tr key={ind}>
                    <td>
                      <span data-test={`username-${ind + 1}`}>
                        {el.username}
                      </span>
                    </td>
                    <td>
                      <span data-test={`role-${ind + 1}`}>{el.role}</span>
                    </td>
                    {el.username === this.state.logged && <td />}
                    {el.username !== this.state.logged && (
                      <td>
                        <a
                          href="?"
                          data-test={`delete-btn-${ind + 1}`}
                          data-test-dir="left"
                          onClick={(e) => {
                            e.preventDefault();
                            this.setState({
                              model: true,
                              delete: el._id,
                              username: el.username
                            });
                          }}
                        >
                          Delete
                        </a>{" "}
                        |{" "}
                        <Link
                          to={`/users/${el._id}`}
                          data-test={`edit-btn-${ind + 1}`}
                        >
                          Edit
                        </Link>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default Users;
