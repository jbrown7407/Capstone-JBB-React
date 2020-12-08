import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      original_name: "",
      name: "",
      owner: "",
      breed: "",
      redirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/v1/dogs/" + this.props.match.params.id)
      .then((data) => {
        // console.log(data);
        return data.json();
      })
      .then((json) => {
        console.log(json);
        this.setState({
          original_name: json.data.name,
          name: json.data.name,
          owner: json.data.owner,
          breed: json.data.breed,
        });
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.props.match.params.id);
    fetch("http://localhost:8000/api/v1/dogs/" + this.props.match.params.id, {
      method: "PUT",
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
        this.setState({
          redirect: true,
        });
        this.props.getDogs();
      });
  }

  render() {
    return (
      <div>
        <h2>{this.state.original_name && this.state.original_name}</h2>
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
          <input type="submit" value="Save changes" />
        </form>
        {this.state.redirect && <Redirect to="/" />}
      </div>
    );
  }
}