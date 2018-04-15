import React , { Component } from 'react';
import { connect } from "react-redux";
import { changeSortAction } from "../actions";

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


const items = [
    <MenuItem key={1} value="popular" primaryText="popular" />,
    <MenuItem key={2} value="unpopular" primaryText="unpopular" />,
    <MenuItem key={3} value="oldest" primaryText="oldest" />,
    <MenuItem key={4} value="newest" primaryText="newest" />
];

class SortBy extends Component {

    state={value:""};

    handleChange = (event, index, value) => {
        this.setState({value});
        this.props.changeSortAction({value});
    }


    render(){
        return(
            <div>
                <SelectField
                    value={this.state.value}
                    onChange={this.handleChange}
                    floatingLabelText="Sort By"
                >
                    {items}
                </SelectField>
            </div>
        )
    }
}

const mapStateToProps = ({ sort }) => ({
    sort
});

export default connect(mapStateToProps, { changeSortAction })(SortBy);