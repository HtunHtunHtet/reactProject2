import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {fetchCategories} from "../actions";

import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
const nearbyIcon = <IconLocationOn />;

class Menu extends Component {
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
                    {receiveCategories.length > 0 &&
                    receiveCategories.map((category,key) =>(
                        <BottomNavigationItem
                            label={category.name}
                            icon={nearbyIcon}
                            key={category}
                            onClick={() => this.select(key)}
                        />
                    ))}

                    <BottomNavigationItem
                        label="All"
                        icon={nearbyIcon}
                        onClick = {() => this.select(4)}
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
})(Menu)