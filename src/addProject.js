import React, { Component } from "react";
import Header from "./header";
import axios from "axios";
import "./styles.css";
import { Link } from "react-router-dom";

class NewProject extends Component {
  state = {
    data: [],
    name: "",
    owner: "select",
    members: [],
    member: "",
    name_error: "",
    owner_error: "",
    members_error: "",
    role: localStorage.getItem("role"),
    username: localStorage.getItem("username")
  };

  async componentDidMount() {
    const { data } = await axios.get("https://mnqs7.sse.codesandbox.io/users");
    // const data = Object.keys(d).sort(function(a, b) {
    //   return a.username - b.username;
    // });
    if (this.state.role === "owner") {
      this.setState({ data, owner: this.state.username });
    } else {
      this.setState({ data });
    }
  }

  onChange = (e, type) => {
    if (type === "name") {
      const name = e.target.value;
      if (name === "") {
        const name_error = "Name is required";
        this.setState({ name_error });
      } else {
        const name_error = "";
        this.setState({ name_error });
      }
      this.setState({ name });
    } else if (type === "owner") {
      const owner = e.target.value;
      if (owner === "" || owner === "select") {
        const owner_error = "Owner is required";
        this.setState({ owner_error });
      } else {
        const owner_error = "";
        this.setState({ owner_error });
      }
      this.setState({ owner });
    } else if (type === "member") {
      const member = e.target.value;
      if (member !== "" && member !== "select") {
        const members_error = "";
        this.setState({ members_error });
        this.setState({ member });
      } else {
        this.setState({ member: "" });
      }
    }
  };

  onAddMember = e => {
    e.preventDefault();
    if (this.state.member !== "") {
      const members = [...this.state.members];
      members.push(this.state.member);
      this.setState({ members, member: "" });
    } else {
      const members_error = "	Member is required";
      this.setState({ members_error });
    }
  };

  onRemoveMember = (e, val) => {
    e.preventDefault();
    let members = [...this.state.members];
    members = members.filter(el => el !== val);
    this.setState({ members });
  };

  onSubmit = async e => {
    e.preventDefault();
    if (this.state.name !== "" && this.state.owner !== "") {
      const project = {
        name: this.state.name,
        owner: this.state.owner,
        members: this.state.members
      };

      const { data } = await axios.post(
        "https://mnqs7.sse.codesandbox.io/projects",
        project
      );
      this.props.history.push("/projects");
    } else {
      if (this.state.name === "") {
        const name_error = "Name is required";
        this.setState({ name_error });
      }
      if (this.state.owner === "" || this.state.owner === "select") {
        const owner_error = "Owner is required";
        this.setState({ owner_error });
      }
    }
  };
  render() {
    const {
      data,
      name,
      owner,
      members,
      member,
      name_error,
      owner_error,
      members_error
    } = this.state;
    return (
      <React.Fragment>
        <Header />
        <div className="page project-page">
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
            <span data-test="bc-3" data-test-dir="top">
              Add Project
            </span>
          </div>
          {data.length !== 0 && (
            <form className="form" onSubmit={this.onSubmit}>
              <div className="textbox" data-test="name">
                <label for="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={e => this.onChange(e, "name")}
                />
                {name_error !== "" && (
                  <div data-test="error" className="error">
                    {name_error}
                  </div>
                )}
              </div>
              <div className="select" data-test="owner">
                <label for="owner">Owner</label>
                <select
                  id="owner"
                  name="owner"
                  onChange={e => this.onChange(e, "owner")}
                  disabled={this.state.role === "owner" && "disabled"}
                >
                  <option disabled="" value="" selected>
                    select
                  </option>
                  {data
                    .filter(el => el.role === "owner")
                    .map(el => (
                      <option
                        value={el.username}
                        selected={owner === el.username && "selected"}
                      >
                        {el.username}
                      </option>
                    ))}
                  {/* <option value="2">owner1</option>
                  <option value="3">owner2</option> */}
                </select>
                {owner_error !== "" && (
                  <div data-test="error" className="error">
                    {owner_error}
                  </div>
                )}
              </div>
              <div className="member-field">
                Members
                <ul>
                  {members.map((el, ind) => (
                    <li key={ind}>
                      <a
                        data-test={`del-member-btn-${ind + 1}`}
                        data-test-dir="left"
                        href="?"
                        title="delete"
                        onClick={e => this.onRemoveMember(e, el)}
                      >
                        ✕
                      </a>
                      <span data-test={`member-${ind + 1}`}>{el}</span>
                    </li>
                  ))}
                </ul>
                <div className="add-select-wrapper">
                  <div
                    className="select"
                    data-test="add-member"
                    data-test-dir="left"
                  >
                    <select
                      id="member"
                      name="member"
                      onChange={e => this.onChange(e, "member")}
                    >
                      <option
                        disabled=""
                        value=""
                        selected={member === "" && "selected"}
                      >
                        select
                      </option>
                      {data
                        .filter(
                          el =>
                            el.role === "reporter" &&
                            !members.includes(el.username)
                        )
                        .map(el => (
                          <option
                            value={el.username}
                            selected={member === el.username && "selected"}
                          >
                            {el.username}
                          </option>
                        ))}
                      {/* <option value="">Another reporter 1</option>
                      <option value="">Another reporter 2</option> */}
                    </select>
                    {members_error !== "" && (
                      <div data-test="error" className="error">
                        {members_error}
                      </div>
                    )}
                  </div>
                  <button
                    className="btn btn-primary"
                    data-test="add-member-btn"
                    onClick={this.onAddMember}
                  >
                    Add
                  </button>
                </div>
              </div>
              <button
                className="btn btn-primary"
                data-test="save-btn"
                type="submit"
                onClick={this.onSubmit}
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

export default NewProject;
