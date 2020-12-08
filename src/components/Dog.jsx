import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Dog extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    fetch("http://localhost:8000/api/v1/dogs/" + this.props.dog.id, {
      method: "DELETE",
    })
      .then((data) => {
        console.log(data);
        return data.json();
      })
      .then((json) => {
        console.log(json);
        this.props.deleteDog(json);
      });
  }

  render() {
    return (
      <tr>
        <td>
          <Link to={"/" + this.props.dog.id}>{this.props.dog.name}</Link>
        </td>
        <td>{this.props.dog.owner}</td>
        <td>{this.props.dog.breed}</td>
        <td>
          <button onClick={this.handleClick}>X</button>
        </td>
      </tr>
    );
  }
}
