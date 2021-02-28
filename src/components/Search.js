import React, { Component, Fragment } from "react";
import Alert from "./Alert";
import { Loading } from "./Loading";
import Navi from "./Navi";
import Users from "./Users";

export class Search extends Component {
  constructor(props) {
    super(props);
    this.searchuser = this.searchuser.bind(this);
    this.searchRepos = this.searchRepos.bind(this);
    this.deletelinksearch=this.deletelinksearch.bind(this)
    this.showAlert=this.showAlert.bind(this)
    this.url = "https://api.github.com/users/";
    this.state = {
      userdata: null,
      repos: [],
      alert: { msg: null, type: null },
      loading: false
    };
  }
  searchuser(e) {
    const username = e.target.elements.input.value.trim();
    this.setState({loading:true,
                    userdata:null })
    setTimeout(()=>{
      if (username) {
        fetch(this.url + username)
          .then((resolve) => resolve.json())
          .then((data) => {
            if (data.message == "Not Found") {
              this.showAlert("User not found", "danger");
            } else {
              this.setState({ 
                userdata: data,
                loading: false
               });
               this.searchRepos(username);
            }
          }).catch(err=>this.showAlert(err,"warning"));
      } else {
        this.showAlert("Boş Giremessiniz", "danger");
      }
      

    },1500)
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
    console.log(this.state.alert)
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
      }).catch(err=>this.showAlert(err,"warning"));
  }
  deletelinksearch(){
      this.setState({
          userdata:null,
          repos:[]
      })
  }

  render() {
    return (
      <Fragment>
        <Navi/>
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
          {this.state.loading?<Loading/>:null}
          {this.state.alert ? <Alert alert={this.state.alert} /> : null}
          {this.state.userdata ? (
            <Users userdata={this.state.userdata} repos={this.state.repos} deletelinksearch={this.deletelinksearch} />
          ) : null}
        </div>
      </Fragment>
    );
  }
}

export default Search;
