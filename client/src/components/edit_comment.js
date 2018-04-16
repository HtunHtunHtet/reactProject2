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

    render(){
        return(
               <div>Testing 234</div>
        )
    }
}

const mapStateToProps = ({ receiveComment }) => ({
    receiveComment
});

export default connect(mapStateToProps, { fetchEditComment, fetchComment })(
    EditComment
);