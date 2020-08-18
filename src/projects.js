import React, { Component } from "react";
import Header from "./header";
import axios from "axios";
import "./styles.css";
import { Link } from "react-router-dom";

class Projects extends Component {
  state = {
    data: [],
    model: false,
    delete: 0,
    name: "",
    role: localStorage.getItem("role"),
    username: localStorage.getItem("username")
  };

  async componentDidMount() {
    let { data } = await axios.get("https://mnqs7.sse.codesandbox.io/projects");
    // const data = Object.keys(d).sort(function(a, b) {
    //   return a.username - b.username;
    // });
    // data.sort(function(a, b) {
    //   return a.username - b.username;
    // });

    console.log(data);
    if (this.state.role === "owner") {
      data = data.filter(el => el.owner === this.state.username);
    } else if (this.state.role === "reporter") {
      data = data.filter(el => el.members.includes(this.state.username));
    }

    data.sort((a, b) =>
      a["name"].toLowerCase() > b["name"].toLowerCase() ? 1 : -1
    );
    // const { data: user } = await axios.get(
    //   "https://mnqs7.sse.codesandbox.io/users/" + localStorage.getItem("id")
    // );
    this.setState({ data });
  }

  onDelete = async e => {
    e.preventDefault();
    this.setState({ data: [] });
    await axios.delete(
      "https://mnqs7.sse.codesandbox.io/projects/" + this.state.delete
    );
    const { data } = await axios.get(
      "https://mnqs7.sse.codesandbox.io/projects"
    );
    // const data = Object.keys(d).sort(function(a, b) {
    //   return a.username - b.username;
    // });
    data.sort((a, b) =>
      a["name"].toLowerCase() > b["name"].toLowerCase() ? 1 : -1
    );
    this.setState({ model: false, delete: 0, data, name: "" });
  };

  render() {
    const { data } = this.state;
    return (
      <React.Fragment>
        {this.state.model && (
          <React.Fragment>
            <div className="alpha" />
            <div className="modal">
              <div className="modal__content" data-test="modal">
                <h2 className="modal__title">Confirm</h2>
                <div className="modal__desc">
                  <span data-test="desc">
                    Are you sure to delete "{this.state.name}"?
                  </span>
                </div>
                <div className="modal__buttons">
                  <button
                    data-test="yes-btn"
                    className="btn btn-primary"
                    onClick={e => this.onDelete(e)}
                  >
                    Yes
                  </button>
                  <button
                    data-test="no-btn"
                    className="btn btn-primary"
                    onClick={e => {
                      e.preventDefault();
                      this.setState({
                        model: false,
                        delete: 0,
                        name: ""
                      });
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
        <Header />
        <div className="page projects-page">
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
              Projects
            </span>
          </div>
          <Link
            to="/projects/new"
            data-test="add-project-btn"
            className="btn btn-primary"
          >
            + Add Project
          </Link>
          {data.length !== 0 && (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Owner</th>
                  <th>Issues</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((el, ind) => (
                  <tr>
                    <td>
                      <span data-test={`name-${ind + 1}`}>{el.name}</span>
                    </td>
                    <td>
                      <span data-test={`owner-${ind + 1}`}>{el.owner}</span>
                    </td>
                    <td>
                      <Link
                        data-test={`issues-${ind + 1}`}
                        to={`/projects/${el._id}/issues`}
                      >
                        {el.issues.length} open issue
                        {el.issues.length !== 1 && "s"}
                      </Link>
                    </td>
                    <td>
                      {this.state.role === "admin" && (
                        <a
                          href="?"
                          data-test={`delete-btn-${ind + 1}`}
                          data-test-dir="left"
                          onClick={e => {
                            e.preventDefault();
                            this.setState({
                              model: true,
                              delete: el._id,
                              name: el.name
                            });
                          }}
                        >
                          Delete
                        </a>
                      )}
                      {this.state.role === "admin" && " |"}{" "}
                      {this.state.role !== "reporter" && (
                        <Link
                          to={`/projects/${el._id}`}
                          data-test={`edit-btn-${ind + 1}`}
                        >
                          Edit
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Projects;
