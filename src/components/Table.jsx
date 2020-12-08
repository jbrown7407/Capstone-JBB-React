import React, { Component } from "react";
import Dog from "./Dog";

export default class Table extends Component {
  render() {
    return (
      <div>
        <table>
          <thead>
            <th> Name </th> <th> Owner </th> <th> Breed </th> <th> Delete </th>{" "}
          </thead>{" "}
          {this.props.dogs.map((dog) => {
            return <Dog dog={dog} deleteDog={this.props.deleteDog} />;
          })}{" "}
        </table>{" "}
      </div>
    );
  }
}