import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./homePage";
import AddPost from "../components/add_post"
import '../App.css';


class App extends Component {
  render() {
      return (
          <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/addPost" component={AddPost}/>
          </Switch>
    );
  }
}

 export default App;
