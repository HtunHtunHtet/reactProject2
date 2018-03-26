import React, { Component } from "react";
import {fetchCategories} from "../actions";
import { connect } from "react-redux";
import '../App.css';

//import  material ui components
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import MobileTearSheet from '../components/TearSheet';
import {List, ListItem} from 'material-ui/List';
import Archive from 'material-ui/svg-icons/content/archive' ;
import {
    Card,
    CardHeader
    } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';

//fetch all categories

class App extends Component {

  render() {

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
                          <ListItem primaryText="React" leftIcon={<Archive />} />
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
