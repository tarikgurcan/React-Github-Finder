import React, { Component, Fragment } from "react";
import Repos from "./Repos";

export class Users extends Component {
  constructor(props) {
    super(props);
    this.deletesearch = this.deletesearch.bind(this);
  }
  deletesearch() {
    this.props.deletelinksearch();
  }
  render() {
    return (
      <div>
        <div className="card mt-5">
          <div className="card-header">
            <h3 className="d-inline-block">Name: {this.props.userdata.name}</h3>
            <button
              className="btn btn-outline-danger float-right"
              onClick={this.deletesearch}
            >
              Clear Search
            </button>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-3">
                <div className="card-image">
                  <img
                    src={this.props.userdata.avatar_url}
                    alt=""
                    className="img-thumbnail"
                  />
                </div>
              </div>
              <div className="col-md-9">
                <div className="display-4">{this.props.userdata.bio}</div>
                <button className="btn btn-secondary  mr-2" id="btn1">
                  Followers{" "}
                  <span className="badge badge-light">
                    {this.props.userdata.followers}
                  </span>
                </button>
                <button className="btn btn-info  mr-2">
                  Following{" "}
                  <span className="badge badge-light">
                    {this.props.userdata.following}
                  </span>
                </button>
                <button className="btn btn-danger  mr-2">
                  Repos{" "}
                  <span className="badge badge-light">
                    {this.props.userdata.public_repos}
                  </span>
                </button>
                <Repos repos={this.props.repos} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Users;
