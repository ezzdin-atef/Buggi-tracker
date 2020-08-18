import React, { Component } from "react";
import Login from "./login";
import Logged from "./logged";
import Users from "./users";
import Projects from "./projects";
import NewProject from "./addProject";
import EditProject from "./editProject";
import Issues from "./issues";
import AddIssues from "./addIssue";
import NewUser from "./newUser";
import OpenIssue from "./openIssue";
import Edit from "./edit";
import { Switch, Route, Redirect } from "react-router-dom";
import "./styles.css";

class App extends Component {
  state = {
    id: localStorage.getItem("id")
  };
  update = () => {
    this.setState({ id: localStorage.getItem("id") });
  };
  render() {
    return (
      <div>
        <Switch>
          <Route
            path="/login"
            render={props => {
              if (!this.state.id)
                return <Login {...props} update={this.update} />;
              else return <Redirect to="/" />;
            }}
          />
          <Route
            path="/users/new"
            exact
            render={props => {
              if (this.state.id) return <NewUser {...props} />;
              else return <Redirect to="/login" />;
            }}
          />
          <Route
            path="/users/:id"
            exact
            render={props => {
              if (this.state.id) return <Edit {...props} />;
              else return <Redirect to="/login" />;
            }}
          />
          <Route
            path="/users"
            exact
            render={props => {
              if (this.state.id) return <Users {...props} />;
              else return <Redirect to="/login" />;
            }}
          />
          <Route
            path="/projects/:id/issues/new"
            exact
            render={props => {
              if (this.state.id) return <AddIssues {...props} />;
              else return <Redirect to="/login" />;
            }}
          />
          <Route
            path="/projects/:id/issues/:num"
            exact
            render={props => {
              if (this.state.id) return <OpenIssue {...props} />;
              else return <Redirect to="/login" />;
            }}
          />

          <Route
            path="/projects/:id/issues"
            exact
            render={props => {
              if (this.state.id) return <Issues {...props} />;
              else return <Redirect to="/login" />;
            }}
          />
          <Route
            path="/projects/new"
            exact
            render={props => {
              if (this.state.id) return <NewProject {...props} />;
              else return <Redirect to="/login" />;
            }}
          />
          <Route
            path="/projects/:id"
            exact
            render={props => {
              if (this.state.id) return <EditProject {...props} />;
              else return <Redirect to="/login" />;
            }}
          />
          <Route
            path="/projects"
            exact
            render={props => {
              if (this.state.id) return <Projects {...props} />;
              else return <Redirect to="/login" />;
            }}
          />
          <Route
            path="/"
            exact
            render={props => {
              if (this.state.id)
                return <Logged {...props} update={this.update} />;
              else return <Redirect to="/login" />;
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
