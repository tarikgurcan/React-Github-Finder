import React, { Component, Fragment } from "react";
import propTypes from "prop-types"

export class Navi extends Component {
  render() {
    return (
        <Fragment>
        <nav className="navbar bg-secondary navbar-dark">
            
          <a href="#" className="navbar-brand ml-3">
            <i className={this.props.icon}></i> {this.props.title}
          </a>
        </nav>
        </Fragment>
    );
  }
}

Navi.defaultProps={
    title:"Github-Finder",
    icon:"fab fa-github"
}
Navi.propTypes={
    title:propTypes.string.isRequired,
    icon:propTypes.string.isRequired

}

export default Navi;
