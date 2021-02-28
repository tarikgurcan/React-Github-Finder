import React, { Component, Fragment } from "react";

export class Repos extends Component {
  render() {
    return (
      <Fragment>
        <h3 className="mt-3">Repos: </h3>
        <hr />
        <ul className="list-group">
          {this.props.repos.map((repo, index) => {
            return (
              <li className="list-group-item" key={index}>
                <a href={repo.svn_url} className="pt-1">
                  {repo.name}
                </a>
                <button className="btn btn-secondary float-right">
                  Stars{" "}
                  <span className="badge badge-light" id="repoStar">
                    {repo.stargazers_count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </Fragment>
    );
  }
}

export default Repos;
