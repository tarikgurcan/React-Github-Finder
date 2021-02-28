import React, { Component, Fragment } from "react";

export class Alert extends Component {
  render() {
    return (
      <Fragment>
        <div className={`alert alert-${this.props.alert.type}`}>
          {this.props.alert.msg}
        </div>
      </Fragment>
    );
  }
}

export default Alert;
