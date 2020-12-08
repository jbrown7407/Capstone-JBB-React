import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import EditForm from "./components/EditForm";
import Form from "./components/Form";
import Table from "./components/Table";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogs: [],
    };
    this.getDogs = this.getDogs.bind(this);
    this.addDog = this.addDog.bind(this);
    this.deleteDog = this.deleteDog.bind(this);
  }

  addDog(newDog) {
    this.setState({
      dogs: [...this.state.dogs, newDog.data],
    });
  }

  deleteDog(json) {
    const id = parseInt(json.data);
    const index = this.state.dogs.findIndex((dog) => dog.id === id);
    console.log(index);
    let copyDogs = [...this.state.dogs];
    copyDogs.splice(index, 1);
    console.log(copyDogs);
    this.setState({
      dogs: copyDogs,
    });
  }
  getDogs() {
    fetch("http://localhost:8000/api/v1/dogs/")
      .then((data) => {
        // console.log(data);
        return data.json();
      })
      .then((json) => {
        console.log(json);
        this.setState({
          dogs: json.data,
        });
      });
  }

  componentDidMount() {
    this.getDogs();
  }

  render() {
    return (
      <div>
        <h3> Welcome to dog shelter </h3>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Table dogs={this.state.dogs} deleteDog={this.deleteDog} />
              <Form addDog={this.addDog} />{" "}
            </Route>
            {/* <Route exact path="/:id" component={EditForm}></Route> */}
            <Route
              path="/:id"
              render={(props) => <EditForm {...props} getDogs={this.getDogs} />}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
