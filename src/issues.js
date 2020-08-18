import React, { Component } from "react";
import Header from "./header";
import axios from "axios";
import "./styles.css";
import { Link } from "react-router-dom";

class Issues extends Component {
  state = {
    data: [],
    name: "",
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

    // const reverse = [];
    // for (let i = data.issues.length - 1; i >= 0; i--) {
    //   reverse.push(data.issues[i]);
    // }
    // console.log(reverse);
    this.setState({ data: data.issues, name: data.name });
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
  /*
  <tr key={ind + 1}>
  <td>
    <span data-test={`id-${ind + 1}`}>{ind + 1}</span>
  </td>
  <td>
    <Link
      to={`/projects/${
        this.props.match.params.id
      }/issues/${ind + 1}`}
      data-test={`title-${ind + 1}`}
    >
      {el.title}
    </Link>
  </td>
  <td>
    <span data-test="author-1">{el.author}</span>
  </td>
  <td>
    <span data-test="status-1">Open</span>
  </td>
</tr>
*/
  render() {
    const { data } = this.state;
    const item = [];
    for (let ind = data.length - 1; ind >= 0; ind--) {
      item.push(
        <tr key={ind + 1}>
          <td>
            <span data-test={`id-${((ind + 1) % data.length) + 1}`}>
              {ind + 1}
            </span>
          </td>
          <td>
            <Link
              to={`/projects/${this.props.match.params.id}/issues/${ind + 1}`}
              data-test={`title-${((ind + 1) % data.length) + 1}`}
            >
              {data[ind].title}
            </Link>
          </td>
          <td>
            <span data-test={`author-${((ind + 1) % data.length) + 1}`}>
              {data[ind].author}
            </span>
          </td>
          <td>
            <span data-test={`status-${((ind + 1) % data.length) + 1}`}>
              Open
            </span>
          </td>
        </tr>
      );
    }
    return (
      <React.Fragment>
        <Header />
        <div className="page issues-page">
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
              <span data-test="bc-3" data-test-dir="top">
                {this.state.name} - Issues
              </span>
            )}
          </div>
          <Link
            to={`/projects/${this.props.match.params.id}/issues/new`}
            data-test="add-issue-btn"
            className="btn btn-primary"
          >
            + Add Issue
          </Link>
          {data.length !== 0 && (
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {/* {data.map((el, ind) => (
                 
                ))} */}
                {item}
              </tbody>
            </table>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Issues;
