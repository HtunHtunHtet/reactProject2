import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAddPost } from "../actions";
import Menu from './menu';
import uuidv1 from "uuid/v1";

import AppBar from 'material-ui/AppBar';
import { Link } from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class AddPost extends  Component {
    state = {
                value: 1,
                postCategory: "react",
                postTitle: "",
                postAuthor: "",
                postContent: ""
            };

    handleChange = (event, index, value) => this.setState({value});

    handleSubmit(event){
        event.preventDefault();
        console.log("almost submit");
    }

    render() {
        return (
                <MuiThemeProvider>
                    <div>
                        <div className="appbar-wrapper">
                            <Link to="/">
                                <AppBar
                                    title="Readable"
                                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                                    onClick = {this.handleToggle}
                                />
                            </Link>
                            <Menu />
                        </div>
                        <div className="cards-wrapper">
                            <form onSubmit={this.handleSubmit} >
                                <SelectField fullWidth={true} className="choose-cat" required={true} floatingLabelText="Choose Category" value={this.state.value} onChange={this.handleChange}>
                                    <MenuItem value="react" primaryText="react" />
                                    <MenuItem value="redux" primaryText="redux" />
                                    <MenuItem value="udacity" primaryText="udacity"/>
                                </SelectField>

                                <TextField  floatingLabelText="Post Tiltle" floatingLabelFixed={true} fullWidth ={true}/>

                                <TextField  floatingLabelText="Author" floatingLabelFixed={true} fullWidth ={true}/>

                                <TextField  floatingLabelText="Post Contents" floatingLabelFixed={true} fullWidth ={true} multiLine={true} rows={4}/>

                                <RaisedButton label="Post Content"  primary={true} fullWidth={true} />
                            </form>
                        </div>
                    </div>
                </MuiThemeProvider>
        )
    }
}

export default connect(null, { fetchAddPost })(AddPost);
