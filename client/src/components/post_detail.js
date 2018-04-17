import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
    fetchSinglePost,
    fetchComments,
    fetchDeletePost,
    fetchAddComment,
    fetchDeleteComment,
    fetchVoteComment,
    fetchVotePost
} from "../actions";
import Menu from './menu';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Thumbup from 'material-ui/svg-icons/action/thumb-up';
import Thumbdown from 'material-ui/svg-icons/action/thumb-down';
import Chip from 'material-ui/Chip';
import uuidv1 from "uuid/v1";
import {blue500, greenA200, grey800, red500} from "material-ui/styles/colors";
import Timestamp from "react-timestamp";
import Avatar from 'material-ui/Avatar';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import Clock from 'material-ui/svg-icons/action/alarm';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Delete from 'material-ui/svg-icons/action/delete';
import EditChange from 'material-ui/svg-icons/action/track-changes';


class PostDetail extends Component {
    state = {
        commentAuthor: "",
        commentContent: ""
    };

    componentDidMount() {
        this.props.fetchPost(this.props.match.params.post_id);
        console.log(this.props.fetchPost(this.props.match.params.post_id));
    }

    deletePost = postId => {
        this.props.deletePost(postId);
    };

    onDeleteComment = commentId => {
        this.props.deleteComment(commentId);
    };

    iconThumbsUp = (postId, option) => {
        this.props.votePost(postId, "upVote");
    };

    iconThumbsDown = (postId, option) => {
        this.props.votePost(postId, "downVote");
    };

    iconThumbsUpComment = (commentId, option) => {
        this.props.voteComment(commentId, "upVote");
    };

    iconThumbsDownComment = (commentId, option) => {
        this.props.voteComment(commentId, "downVote");
    };

    handleSubmit = e => {
        e.preventDefault();
        const data = {
            id: uuidv1(),
            timestamp: Date.now(),
            body: this.state.commentContent,
            author: this.state.commentAuthor,
            parentId: this.props.match.params.post_id,
            deleted: false,
            parentDeleted: false,
            voteScore: 1
        };
        this.props.addComment(data);
        this.setState({
            commentAuthor: "",
            commentContent: ""
        });
    };

    handleInputChange = e => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };


    render() {
        const { posts } = this.props.posts;
        const { comments } = this.props.getComments;
        const { sort } = this.props.sort;

        console.log(this.state);
        return (
            <MuiThemeProvider>
                <div className="appbar-wrapper">
                    <Link to="/">
                        <AppBar
                            title="Readable"
                            iconClassNameRight="muidocs-icon-navigation-expand-more"
                            onClick = {this.handleToggle}
                            className = "logoHead"
                        />
                    </Link>
                    <Menu/>
                    <div className="cards-wrapper">
                    {/*switch category*/}
                    {
                        posts && posts.length > 0 &&
                        posts.filter(
                            post =>
                                !post.deleted && Object.keys(post).length > 0 && !post.error
                        ).map(post =>(

                                <Card className="card-holder">
                                    <CardHeader
                                        title={post.title}
                                        actAsExpander={false}
                                    />
                                    <CardActions>
                                        <div className="details-holder">
                                            <div>
                                                <Chip>
                                                    <Avatar color="#444" icon={<SvgIconFace />} />
                                                    {post.author}
                                                </Chip>
                                            </div>
                                            <div>
                                                <Chip>
                                                    <Avatar color="#444" icon={<Clock />} />
                                                    <Timestamp
                                                        time={post.timestamp / 1000}
                                                        format="full"
                                                    />
                                                </Chip>
                                            </div>
                                        </div>

                                        <div className="body-holder">
                                            {post.body}
                                        </div>

                                        <div className="thumbsholder-total">
                                            <div className="thumbsholder">
                                                <div>
                                                    <Thumbup
                                                        className="thumbupdown"
                                                        color={greenA200}
                                                        hoverColor={blue500}
                                                        onClick={() => this.iconThumbsUp(post.id, "upVote")}
                                                    />
                                                </div>
                                                <div>
                                                    <Chip className= "chips">
                                                        {post.voteScore}
                                                    </Chip>
                                                </div>
                                                <div>
                                                    <Thumbdown
                                                        className="thumbupdown"
                                                        color={red500}
                                                        hoverColor={grey800}
                                                        onClick={() => this.iconThumbsDown(post.id, "downVote")}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <FlatButton
                                                    label="Delete Posts"
                                                    onClick={() => this.deletePost(post.id)}
                                                    secondary={true}
                                                />
                                                <Link to={`/editpost/${post.id}`}>
                                                    <FlatButton
                                                        label="Edit Posts"
                                                        primary={true}
                                                    />
                                                </Link>
                                            </div>
                                        </div>



                                    </CardActions>
                                    <CardText expandable = {false} >
                                        {
                                            posts &&
                                            posts.length > 0 &&
                                            posts.filter(
                                                post => !post.deleted && Object.keys(post).length > 0
                                            ).length > 0 &&
                                            comments &&
                                            comments
                                                .filter(comment => !comment.deleted)
                                                .filter(comment => !comment.parentDeleted)
                                                .sort((a, b) => {
                                                    switch (this.props.sort.sort.value) {
                                                        case "unpopular":
                                                            return a.voteScore - b.voteScore;
                                                        case "oldest":
                                                            return a.timestamp - b.timestamp;
                                                        case "newest":
                                                            return b.timestamp - a.timestamp;
                                                        default:
                                                            return b.voteScore - a.voteScore;
                                                    }
                                                })
                                                .map(comment => (
                                                    <div key={comment.id} className="comment-wrapper">
                                                        <div className="details-holder">
                                                            <div>
                                                                <Chip>
                                                                    <Avatar color="#444" icon={<SvgIconFace />} />
                                                                    {comment.author}
                                                                </Chip>
                                                            </div>
                                                            <div>
                                                                <Chip>
                                                                    <Avatar color="#444" icon={<Clock />} />
                                                                    <Timestamp
                                                                        time={post.timestamp / 1000}
                                                                        format="full"
                                                                    />
                                                                </Chip>
                                                            </div>
                                                        </div>

                                                        <div className="comment-holder">
                                                            <div>
                                                                {comment.body}
                                                            </div>
                                                            <div className="thumbsholder comment-thumbsholder">
                                                                <div>
                                                                    <Thumbup
                                                                        className="thumbupdown"
                                                                        color={greenA200}
                                                                        hoverColor={blue500}
                                                                        onClick={() => this.iconThumbsUpComment(comment.id, "upVote")}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Chip className= "chips">
                                                                        {comment.voteScore}
                                                                    </Chip>
                                                                </div>
                                                                <div>
                                                                    <Thumbdown
                                                                        className="thumbupdown"
                                                                        color={red500}
                                                                        hoverColor={grey800}
                                                                        onClick={() => this.iconThumbsDownComment(comment.id, "downVote")}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="comment-buttons-holder">
                                                            <FlatButton
                                                                icon={<Delete />}
                                                                secondary={true}
                                                                onClick={() => this.onDeleteComment(comment.id)}
                                                            />
                                                            <Link to={`/editcomment/${comment.id}`}>
                                                                <FlatButton
                                                                    icon={<EditChange className="editComment"/>}
                                                                    primary={true}
                                                                />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))}
                                    </CardText>
                                </Card>
                        ))
                    }

                        {
                        posts &&
                        posts.length > 0 &&
                        posts.filter(
                            post =>
                                !post.deleted && Object.keys(post).length > 0 && !post.error
                        ).length > 0 ? (
                            <div className="add-comment-holder">
                                <h2>Add Comments</h2>
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
                        ) : (
                            <div className="post-not-found-wrapper">
                                <h3 className="post-not-found">Post not found.</h3>
                                <Link to={`/`}>
                                    <FlatButton label="Back" secondary={true}/>
                                </Link>
                            </div>
                        )}


                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = ({ posts, getComments,sort }) => ({
    posts,
    getComments,
    sort
});

const mapDispatchToProps = dispatch => ({
    //Fetch single post by postId, then, fetch the comments for that post.
    fetchPost: postId =>
        dispatch(fetchSinglePost(postId)).then(() =>
            dispatch(fetchComments(postId))
        ),
    deletePost: postId => dispatch(fetchDeletePost(postId)),
    addComment: comment => dispatch(fetchAddComment(comment)),
    deleteComment: commentId => dispatch(fetchDeleteComment(commentId)),
    voteComment: (commentId, option) =>
        dispatch(fetchVoteComment(commentId, option)),
    votePost: (postId, option) => dispatch(fetchVotePost(postId, option))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);