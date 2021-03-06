import React, { Component, Fragment } from "react";
import Alert from "./Alert";
import Lastsearch from "./Lastsearch";
import { Loading } from "./Loading";
import Navi from "./Navi";
import Users from "./Users";

export class Search extends Component {
  constructor(props) {
    super(props);
    this.searchuser = this.searchuser.bind(this);
    this.searchRepos = this.searchRepos.bind(this);
    this.deletelinksearch = this.deletelinksearch.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.url = "https://api.github.com/users/";
    this.state = {
      userdata: null,
      repos: [],
      alert: { msg: null, type: null },
      loading: false,
      lastsearch: [],
    };
  }
  componentDidMount() {
    if (localStorage.getItem("lastsearch")) {
      const newlastSearch = JSON.parse(localStorage.getItem("lastsearch"));
      this.setState({ lastsearch: newlastSearch });
    } else {
      this.setState({ lastsearch: [] });
    }
  }

  searchuser(e) {
    const username = e.target.elements.input.value.trim();
    this.setState({ loading: true, userdata: null });
    setTimeout(() => {
      if (username) {
        fetch(this.url + username)
          .then((resolve) => resolve.json())
          .then((data) => {
            if (data.message == "Not Found") {
              this.showAlert("User not found", "danger");
            } else {
              this.setState({
                lastsearch: [...this.state.lastsearch, data.name],
                userdata: data,
                loading: false,
              });
              this.searchRepos(username);
              localStorage.setItem(
                "lastsearch",
                JSON.stringify(this.state.lastsearch)
              );
            }
          })
          .catch((err) => this.showAlert(err, "warning"));
      } else {
        this.showAlert("You cannot enter null value", "danger");
      }
    }, 1500);
    e.target.elements.input.value = "";
    e.preventDefault();
  }
  showAlert(text, type) {
    this.setState({
      loading: false,
      alert: {
        msg: text,
        type: type,
      },
    });
    console.log(this.state.alert);
    setTimeout(() => {
      this.setState({
        alert: {
          msg: null,
          type: null,
        },
      });
    }, 3000);
  }
  searchRepos(username) {
    fetch(this.url + username + "/repos")
      .then((resolve) => resolve.json())
      .then((data) => {
        this.setState({ repos: data });
      })
      .catch((err) => this.showAlert(err, "warning"));
  }
  deletelinksearch() {
    this.setState({
      userdata: null,
      repos: [],
    });
  }

  deletelastsearch = () => {
    this.setState({ lastsearch: [] });
    localStorage.removeItem("lastsearch");
  };

  render() {
    return (
      <Fragment>
        <Navi />
        <div className="container">
          <div className="card mb-2">
            <div className="card-header">
              <label>
                <h4>Search</h4>
              </label>
            </div>
            <form onSubmit={this.searchuser}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type a new User"
                  name="input"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary">Enter</button>
                </div>
              </div>
            </form>
          </div>
          {this.state.loading ? <Loading /> : null}
          {this.state.alert ? <Alert alert={this.state.alert} /> : null}
          {this.state.userdata ? (
            <Users
              userdata={this.state.userdata}
              repos={this.state.repos}
              deletelinksearch={this.deletelinksearch}
            />
          ) : null}
          {this.state.lastsearch.length > 0 ? (
            <Lastsearch
              lastsearch={this.state.lastsearch}
              deletelastsearch={this.deletelastsearch}
            />
          ) : null}
        </div>
      </Fragment>
    );
  }
}

export default Search;
