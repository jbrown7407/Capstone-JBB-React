import React, { Component } from "react";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      owner: "",
      breed: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:8000/api/v1/dogs/", {
      method: "POST",
      body: JSON.stringify({
        name: this.state.name,
        owner: this.state.owner,
        breed: this.state.breed,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        console.log(data);
        return data.json();
      })
      .then((json) => {
        console.log(json);
        this.props.addDog(json);
      });

    this.setState({
      name: "",
      owner: "",
      breed: "",
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            name="name"
            id="name"
            onChange={this.handleChange}
            value={this.state.name}
          />
        </label>
        <label htmlFor="owner">
          Owner:
          <input
            type="text"
            name="owner"
            id="owner"
            onChange={this.handleChange}
            value={this.state.owner}
          />
        </label>
        <label htmlFor="breed">
          Breed:
          <input
            type="text"
            name="breed"
            id="breed"
            onChange={this.handleChange}
            value={this.state.breed}
          />
        </label>
        <input type="submit" value="Add dog!" />
      </form>
    );
  }
}
