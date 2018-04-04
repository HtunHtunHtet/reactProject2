import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {fetchCategories} from "../actions";

import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';


const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;

class SideBar extends Component {
    state = {selectedIndex:0}
    select = (index) => this.setState({selectedIndex: index})
    //Get All Categories For Menu
    componentDidMount() {
        this.props.fetchCategories();
    }
    render(){
        const { receiveCategories } = this.props;
        return(
            <Paper zDepth={1}>
                <BottomNavigation selectedIndex={this.state.selectedIndex}>
                    <BottomNavigationItem
                        label="Recents"
                        icon={nearbyIcon}
                        onClick={() => this.select(0)}
                    />
                    <BottomNavigationItem
                        label="Favorites"
                        icon={nearbyIcon}
                        onClick={() => this.select(1)}
                    />
                    <BottomNavigationItem
                        label="Nearby"
                        icon={nearbyIcon}
                        onClick={() => this.select(2)}
                    />
                </BottomNavigation>
            </Paper>
        )
    }
}

const mapStateToProps = ({ receiveCategories }) => ({
    receiveCategories
});

export default connect(mapStateToProps,{
    fetchCategories
})(SideBar)