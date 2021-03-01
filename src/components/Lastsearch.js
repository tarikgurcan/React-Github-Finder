import React, { Component } from "react";

export default class Lastsearch extends Component {
  render() {
    return (

      <div>
        
              <div id="lastSearch" className="mt-5">
              <ul className="list-group" id="last-users">
              {this.props.lastsearch.map((usernames,key)=>{return(
                <li className="list-group-item" key={key}>{usernames}</li>
              )})}
              </ul>
              <hr />
              <button id="clear-last-users" className="btn btn-dark" onClick={this.props.deletelastsearch}>
                Clear All Searches
              </button>
            </div>
            
          

     

            

   
        
      </div>
    );
  }
}
