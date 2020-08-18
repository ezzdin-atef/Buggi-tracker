import React, { Component } from "react";
import Header from "./header";
import axios from "axios";
import "./styles.css";
import { Link } from "react-router-dom";

class AddIssues extends Component {
  state = {
    data: [],
    name: "",
    title: "",
    description: "",
    title_error: "",
    description_error: "",
    role: localStorage.getItem("role"),
    username: localStorage.getItem("username")
  };

  async componentDidMount() {
    let { data } = await axios.get(
      "https://buggie-tracker-api.herokuapp.com/projects/" +
        this.props.match.params.id
    );
    // const data = Object.keys(d).sort(function(a, b) {
    //   return a.username - b.username;
    // });
    // data.sort(function(a, b) {
    //   return a.username - b.username;
    // });
    // if (this.state.role === "owner") {
    //   data = data.filter(el => el.owner === this.state.username);
    // } else if (this.state.role === "reporter") {
    //   data = data.filter(el => el.members.includes(this.state.username));
    // }
    // data.sort((a, b) =>
    //   a["name"].toLowerCase() > b["name"].toLowerCase() ? 1 : -1
    // );
    // const { data: user } = await axios.get(
    //   "https://buggie-tracker-api.herokuapp.com/users/" + localStorage.getItem("id")
    // );
    // console.log(data.issues);
    this.setState({ name: data.name });
  }

  // onDelete = async e => {
  //   e.preventDefault();
  //   this.setState({ data: [] });
  //   await axios.delete(
  //     "https://buggie-tracker-api.herokuapp.com/projects/" + this.state.delete
  //   );
  //   const { data } = await axios.get(
  //     "https://buggie-tracker-api.herokuapp.com/projects"
  //   );
  //   // const data = Object.keys(d).sort(function(a, b) {
  //   //   return a.username - b.username;
  //   // });
  //   data.sort((a, b) =>
  //     a["name"].toLowerCase() > b["name"].toLowerCase() ? 1 : -1
  //   );
  //   this.setState({ model: false, delete: 0, data, name: "" });
  // };

  onChange = (e, type) => {
    if (type === "title") {
      const title = e.target.value;
      if (title === "") {
        const title_error = "Title is required";
        this.setState({ title_error });
      } else {
        const title_error = "";
        this.setState({ title_error });
      }

      this.setState({ title });
    } else if (type === "description") {
      const description = e.target.value;
      if (description === "") {
        const description_error = "Description is required";
        this.setState({ description_error });
      } else {
        const description_error = "";
        this.setState({ description_error });
      }

      this.setState({ description });
    }
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const title = this.state.title;
    let title_error = "";
    let description_error = "";
    if (title === "") {
      title_error = "Title is required";
      this.setState({ title_error });
    }
    const description = this.state.description;
    if (description === "") {
      description_error = "Description is required";
      this.setState({ description_error });
    }

    if (title_error === "" && description_error === "") {
      axios
        .patch(
          "https://buggie-tracker-api.herokuapp.com/projects/issue/" +
            this.props.match.params.id,
          {
            issue: {
              title: title,
              description: description,
              author: this.state.username
            }
          }
        )
        .then(() => {
          this.props.history.push(
            "/projects/" + this.props.match.params.id + "/issues"
          );
        });
    }
  };

  render() {
    const { data } = this.state;
    return (
      <React.Fragment>
        <Header />
        <div className="page add-issue-page">
          <div
            className="breadcrumb"
            data-test="breadcrumb"
            data-test-dir="top-center"
          >
            <Link data-test="bc-1" data-test-dir="top" href="/">
              Home
            </Link>
            <span className="breadcrumb__separator">&gt;</span>
            <Link data-test="bc-2" data-test-dir="top" to="/projects">
              Projects
            </Link>
            <span className="breadcrumb__separator">&gt;</span>
            {this.state.name !== "" && (
              <Link
                data-test="bc-3"
                data-test-dir="top"
                to={`/projects/${this.props.match.params.id}/issues`}
              >
                {this.state.name} - Issues
              </Link>
            )}
            <span className="breadcrumb__separator">&gt;</span>
            <span data-test="bc-4" data-test-dir="top">
              Add Issue
            </span>
          </div>
          <form className="form" onSubmit={this.onSubmit}>
            <div className="textbox" data-test="title">
              <label for="name">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                onChange={(e) => this.onChange(e, "title")}
              />
              {this.state.title_error !== "" && (
                <div data-test="error" className="error">
                  {this.state.title_error}
                </div>
              )}
            </div>
            <div className="textbox" data-test="description">
              <label for="name">Description</label>
              <textarea
                id="description"
                name="description"
                onChange={(e) => this.onChange(e, "description")}
              />
              {this.state.description_error !== "" && (
                <div data-test="error" className="error">
                  {this.state.description_error}
                </div>
              )}
            </div>
            <button
              className="btn btn-primary"
              data-test="post-btn"
              type="submit"
              onClick={this.onSubmit}
            >
              Post
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default AddIssues;
