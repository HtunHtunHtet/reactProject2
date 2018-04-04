import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {fetchCategories} from "../actions";
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class SideBar extends Component {
    state = {open:false}

    handleToggle = () => this.setState({open: !this.state.open});

    //Get All Categories For Menu
    componentDidMount() {
        this.props.fetchCategories();
    }
    render(){
        const { receiveCategories } = this.props;
        return(
            <Drawer open={this.state.open}>
                <MenuItem>Menu Item</MenuItem>
                <MenuItem>Menu Item 2</MenuItem>
            </Drawer>
        )
    }
}

const mapStateToProps = ({ receiveCategories }) => ({
    receiveCategories
});

export default connect(mapStateToProps,{
    fetchCategories
})(SideBar)