import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchEditPost, fetchSinglePost } from "../actions";
import Menu from './menu';
import uuidv1 from "uuid/v1";

import AppBar from 'material-ui/AppBar';
import { Link } from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class EditPost extends  Component {
    state = {
                id : "",
                postCategory: "",
                postTitle: "",
                postAuthor: "",
                postContent: ""
            };


    componentDidMount() {
        const { postId } = this.props.match.params;
        this.props.fetchSinglePost(postId).then(() => {
            const { id, title, author, body, category } = this.props.posts.posts[0];
            this.setState({
                id: id,
                postTitle: title,
                postAuthor: author,
                postContent: body,
                postCategory: category
            });
        });
    }

    handleChange = (event, index, postCategory) => this.setState({postCategory});

    handleSubmit = e =>{
        e.preventDefault();
        const { id, postTitle, postCategory, postContent, postAuthor } = this.state;
        const data = {
            id: id,
            title: postTitle,
            body: postContent,
            author: postAuthor,
            category:postCategory
        };
        this.props.fetchEditPost(data,data.id);
        this.props.history.push("/");
    }

    handleInputChange = e => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    render() {
        return (
                <MuiThemeProvider>
                    <div>
                        <div className="appbar-wrapper">
                                <AppBar
                                    title="Readable"
                                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                                    showMenuIconButton = {false}
                                />
                            <Menu />
                        </div>
                        <div className="cards-wrapper">
                            <form onSubmit={this.handleSubmit} >
                                <SelectField
                                    name="postCategory"
                                    fullWidth={true}
                                    className="choose-cat"
                                    required={true}
                                    floatingLabelText="Choose Category"
                                    value={this.state.postCategory}
                                    onChange={this.handleChange}
                                >
                                    <MenuItem value="react" primaryText="react" />
                                    <MenuItem value="redux" primaryText="redux" />
                                    <MenuItem value="udacity" primaryText="udacity"/>
                                </SelectField>

                                <TextField
                                    floatingLabelText="Post Tiltle"
                                    floatingLabelFixed={true}
                                    fullWidth ={true}
                                    required={true}
                                    name="postTitle"
                                    id="post-title"
                                    value={this.state.postTitle}
                                    onChange={this.handleInputChange}
                                />

                                <TextField
                                    name="postAuthor"
                                    floatingLabelText="Author"
                                    floatingLabelFixed={true}
                                    fullWidth ={true}
                                    required={true}
                                    value={this.state.postAuthor}
                                    onChange={this.handleInputChange}
                                />

                                <TextField
                                    name="postContent"
                                    floatingLabelText="Post Contents"
                                    floatingLabelFixed={true}
                                    fullWidth ={true}
                                    multiLine={true}
                                    required={true}
                                    rows={4}
                                    value={this.state.postContent}
                                    onChange={this.handleInputChange}
                                />

                                <RaisedButton type="submit" label="Add Content"  primary={true} fullWidth={true}  />
                            </form>
                        </div>
                    </div>
                </MuiThemeProvider>
        )
    }
}

const mapStateToProps = ({ posts }) => ({
    posts
});

export default connect(mapStateToProps, { fetchEditPost, fetchSinglePost })(EditPost);
