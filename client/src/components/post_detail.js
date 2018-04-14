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
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Thumbup from 'material-ui/svg-icons/action/thumb-up';
import Thumbdown from 'material-ui/svg-icons/action/thumb-down';
import Chip from 'material-ui/Chip';
import uuidv1 from "uuid/v1";
import {blue500, greenA200, grey800, red500} from "material-ui/styles/colors";
import Timestamp from "react-timestamp";
import Avatar from 'material-ui/Avatar';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import Clock from 'material-ui/svg-icons/action/alarm';

class PostDetail extends Component {
    state = {
        commentAuthor: "",
        commentContent: ""
    };

    deletePost = postId => {
        this.props.deletePost(postId);
    };

    //fetch single post by post id
    componentDidMount() {
        this.props.fetchPost(this.props.match.params.post_id);
        console.log(this.props.fetchPost(this.props.match.params.post_id));
    }

    onDeleteComment = commentId => {
        this.props.deleteComment(commentId);
    };

    iconThumbsUp = (postId, option) => {
        this.props.fetchVotePost(postId, "upVote");
    };

    iconThumbsDown = (postId, option) => {
        this.props.fetchVotePost(postId, "downVote");
    };

    render() {
        const { posts } = this.props.posts;
        const { comments } = this.props.getComments;
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

                                        <FlatButton
                                            label="Delete Posts"
                                            onClick={() => this.deletePost(post.id)}
                                        />
                                        <Link to={`/editpost/${post.id}`}>
                                            <FlatButton
                                                label="Edit Posts"

                                            />
                                        </Link>
                                    </CardActions>
                                    <CardText expandable = {true}>
                                        <Divider className="divider-pushtop" />
                                        {post.body}
                                    </CardText>
                                </Card>
                        ))
                    }

                    <Link to="/addpost">
                        <FloatingActionButton className="add-post-holder">
                            <ContentAdd />
                        </FloatingActionButton>
                    </Link>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = ({ posts, getComments }) => ({
    posts,
    getComments
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