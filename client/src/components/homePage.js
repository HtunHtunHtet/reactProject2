import React, {Component} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories } from "../actions";
import AppBar from 'material-ui/AppBar';
import SideBar from './sideBar'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class HomePage extends Component {
    render(){
        return(
            <MuiThemeProvider>
                <div class="page-wrapper">
                    <AppBar
                        title="Readable"
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                        onClick = {this.handleToggle}
                    />
                    <SideBar/>
                </div>
            </MuiThemeProvider>
        )
    }
}


export default HomePage;