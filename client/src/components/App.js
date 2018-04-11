import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./homePage";
import AddPost from "../components/add_post";
import EditPost from "../components/edit_post";
import PostDetail from "../components/post_detail";
import '../App.css';


class App extends Component {
  render() {
      return (
          <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/addPost" component={AddPost}/>
              <Route exact path="/editPost/:postId" component={EditPost} />
              <Route exact path="/:category" component={PostDetail}/>
          </Switch>
    );
  }
}
 export default App;
