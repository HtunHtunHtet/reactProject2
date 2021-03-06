import React, {Component} from "react";
import  * as action from '../actions'
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Menu from './menu'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Thumbup from 'material-ui/svg-icons/action/thumb-up';
import Thumbdown from 'material-ui/svg-icons/action/thumb-down';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import Comment  from 'material-ui/svg-icons/action/feedback';
import Clock from 'material-ui/svg-icons/action/alarm';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Timestamp from "react-timestamp";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {blue500, red500, greenA200 , grey800} from 'material-ui/styles/colors';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SortBy from "./sortBy";

class Categories extends Component {
    componentDidMount() {
        this.props.fetchPostsCategory(this.props.match.params.category);
    }

    deletePost = postId => {
        this.props.fetchDeletePost(postId);
    };

    iconThumbsUp = (postId, option) => {
        this.props.fetchVotePost(postId, "upVote");
    };

    iconThumbsDown = (postId, option) => {
        this.props.fetchVotePost(postId, "downVote");
    };


    render(){
        const {posts} = this.props.posts;
        const {sort}  = this.props.sort;
        let { category } = this.props.match.params;
        return (
            <MuiThemeProvider>
                <div className="appbar-wrapper">
                        <AppBar
                            title="Readable"
                            iconClassNameRight="muidocs-icon-navigation-expand-more"
                            showMenuIconButton = {false}
                        />
                    <Menu/>
                </div>

                {/*Cards */}
                <div className="cards-wrapper">
                    <div className = "category-noti-wrapper">
                        <div>
                            <SortBy/>
                        </div>

                        <div className="category-info">
                            {`Category: ${category}`}
                        </div>
                    </div>
                    {
                        posts && posts.length > 0 ?(
                        posts
                            .filter(post => !post.deleted)
                            .sort((a, b) => {
                                switch (sort.value) {
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
                            .map(
                            post=>(
                                <Card className="card-holder">
                                    <Link to={`/${post.category}/${post.id}`}>
                                        <CardHeader
                                            title={post.title}
                                            actAsExpander={false}
                                        />
                                    </Link>
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

                                            <div>
                                                <Chip>
                                                    <Avatar color="#444" icon={<Comment />} />
                                                    {post.comments && post.comments.length}
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

                                        {/* <Badge badgeContent={post.voteScore} secondary={true} badgeStyle={{top: 12, right: 12}}>
                                                <IconButton tooltip="Like">
                                                    <Thumbup
                                                        className="thumbupdown"
                                                        color={greenA200}
                                                        hoverColor={blue500}
                                                        onClick={() => this.iconThumbsUp(post.id, "upVote")}
                                                    />
                                                </IconButton>
                                            </Badge>

                                            <Badge badgeContent={post.voteScore} secondary={true} badgeStyle={{top: 12, right: 12}}>
                                                <IconButton tooltip="Dislike">
                                                    <Thumbdown
                                                        className="thumbupdown"
                                                        color={red500}
                                                        hoverColor={grey800}
                                                        onClick={() =>
                                                        this.iconThumbsDown(post.id, "downVote")}
                                                    />
                                                </IconButton>
                                            </Badge>*/}
                                        <br/>
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
                            )
                        )):(
                            //display no post notification
                            <div className="no-posts-holder">
                                <h3 className="no-post">
                                    Currently , there is no post in selected category.
                                </h3>
                            </div>
                        )
                    }
                    <Link to="/addpost">
                        <FloatingActionButton className="add-post-holder">
                            <ContentAdd />
                        </FloatingActionButton>
                    </Link>

                </div>
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = ({ posts, sort }) => ({
    posts,
    sort
});

export default connect(mapStateToProps, action)(Categories);
