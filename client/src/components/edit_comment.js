import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchEditComment, fetchComment } from "../actions";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Menu from "./menu";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


class EditComment extends Component {
    state = {
        commentAuthor: "",
        commentContent: ""
    };

    componentDidMount() {
        this.props.fetchComment(this.props.match.params.commentId).then(() => {
            const { author, body } = this.props.receiveComment;
            this.setState({
                commentAuthor: author,
                commentContent: body
            });
        });
    }

    handleInputChange = e => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { commentContent, commentAuthor } = this.state;
        const data = {
            id: this.props.receiveComment.id,
            body: commentContent,
            author: commentAuthor
        };
        //Dispatched editComment action with data from form
        this.props.fetchEditComment(data, data.id);
        //Redirects back to previous page.
        this.props.history.goBack();
    };


    render(){
        console.log(this.state);
        return(
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
                        <div className="add-comment-holder">
                            <h2>Edit Comments</h2>
                            <form onSubmit={this.handleSubmit} >
                                <TextField
                                    floatingLabelText="Author"
                                    floatingLabelFixed={true}
                                    fullWidth ={true}
                                    required={true}
                                    value={this.state.commentAuthor}
                                    onChange={this.handleInputChange}
                                    name="commentAuthor"
                                    id="author"
                                />

                                <TextField
                                    floatingLabelText="Content"
                                    floatingLabelFixed={true}
                                    fullWidth ={true}
                                    required={true}
                                    value={this.state.commentContent}
                                    onChange={this.handleInputChange}
                                    name="commentContent"
                                    id="content"
                                    rows={4}
                                />

                                <RaisedButton type="submit" label="Comment Now!"  primary={true} fullWidth={true}  />
                            </form>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = ({ receiveComment }) => ({
    receiveComment
});

export default connect(mapStateToProps, { fetchEditComment, fetchComment })(
    EditComment
);
