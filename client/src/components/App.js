import React, { Component } from 'react';
import '../App.css';
import { fetchCategories }  from "../utils/api";

//import  material ui components
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import MobileTearSheet from '../components/TearSheet';
import {List, ListItem} from 'material-ui/List';
import Archive from 'material-ui/svg-icons/content/archive' ;
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import { withStyles } from 'material-ui/styles';

//fetch all categories

class App extends Component {
    state = {
        categories: []
    }

    //fetch categories
    componentDidMount(){
        fetchCategories().then((categories) => this.setState({categories}))
    }


  render() {

    const {categories} = this.state;
    console.log ({categories});

    return (
      <div>
          <MuiThemeProvider>
              <AppBar
                  title="ReadAble"
                  iconElementRight={<IconButton>
                      <FontIcon className="material-icons" ></FontIcon>
                  </IconButton>}
              />

              <div className="flex">
                  <div className="tear-sheet-holder">
                  <MobileTearSheet>
                      <List>
                          <ListItem primaryText="all" leftIcon={<Archive />} />
                          <ListItem primaryText="react" leftIcon={<Archive />} />
                          <ListItem primaryText="Redux" leftIcon={<Archive />} />
                          <ListItem primaryText="Udacity" leftIcon={<Archive />} />
                      </List>
                  </MobileTearSheet>
                  </div>
                  <div className="content-holder">
                      <Card>
                          <CardHeader title="URL Avatar"/>
                      </Card>
                  </div>
              </div>
          </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
