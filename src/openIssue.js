import React, { Component } from "react";
import Header from "./header";
import axios from "axios";
import "./styles.css";
import { Link } from "react-router-dom";

class OpenIssue extends Component {
  state = {
    data: null,
    title: "",
    name: "",
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
    console.log(data.issues[this.props.match.params.num - 1]);
    this.setState({
      data: data.issues[this.props.match.params.num - 1],
      name: data.name
    });
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

  // onChange = (e, type) => {
  //   if (type === "title") {
  //     const title = e.target.value;
  //     if (title === "") {
  //       const title_error = "Title is required";
  //       this.setState({ title_error });
  //     } else {
  //       const title_error = "";
  //       this.setState({ title_error });
  //     }

  //     this.setState({ title });
  //   } else if (type === "description") {
  //     const description = e.target.value;
  //     if (description === "") {
  //       const description_error = "Description is required";
  //       this.setState({ description_error });
  //     } else {
  //       const description_error = "";
  //       this.setState({ description_error });
  //     }

  //     this.setState({ description });
  //   }
  // };

  // onSubmit = async e => {
  //   e.preventDefault();
  //   const title = this.state.title;
  //   if (title === "") {
  //     const title_error = "Title is required";
  //     this.setState({ title_error });
  //   }
  //   const description = this.state.description;
  //   if (description === "") {
  //     const description_error = "Description is required";
  //     this.setState({ description_error });
  //   }

  //   if (this.state.title_error === "" && this.state.description_error === "") {
  //     axios
  //       .patch(
  //         "https://buggie-tracker-api.herokuapp.com/projects/issue/" +
  //           this.props.match.params.id,
  //         {
  //           issue: {
  //             title: title,
  //             description: description,
  //             author: this.state.username
  //           }
  //         }
  //       )
  //       .then(res => {
  //         this.props.history.push(
  //           "/projects/" + this.props.match.params.id + "/issues"
  //         );
  //       });
  //   }
  // };

  render() {
    const { data } = this.state;
    return (
      <React.Fragment>
        <Header />

        <div className="page issue-page">
          <div
            className="breadcrumb"
            data-test="breadcrumb"
            data-test-dir="top-center"
          >
            <Link data-test="bc-1" data-test-dir="top" to="/">
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
              #{this.props.match.params.num}
            </span>
          </div>
          <div />
          {data !== null && (
            <React.Fragment>
              <h1
                className="issue-title"
                data-test="issue-title"
                data-test-dir="top-center"
              >
                {data.title} <span>#{this.props.match.params.num}</span>
              </h1>
              <div
                className="issue-post"
                data-test="post-1"
                data-test-dir="top-center"
              >
                <div className="issue-post__author">
                  <span data-test="author">{data.author}</span>
                </div>
                <div
                  className="issue-post__description"
                  data-test="desc"
                  data-test-dir="top-center"
                >
                  {data.description}
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default OpenIssue;
