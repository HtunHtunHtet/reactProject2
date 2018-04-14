import React, {Component} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import  * as action from '../actions'
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Menu from './menu'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {blue500, red500, greenA200 , grey800} from 'material-ui/styles/colors';
import Thumbup from 'material-ui/svg-icons/action/thumb-up';
import Thumbdown from 'material-ui/svg-icons/action/thumb-down';
import Chip from 'material-ui/Chip';

class HomePage extends Component {

    //Get all posts
    componentDidMount(){
        this.props.fetchPosts();
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
        return(
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
                </div>

                {/*Cards */}
                <div className="cards-wrapper">
                    {
                        posts && posts.length > 0 &&
                            posts.map(
                                post=>(
                                    <Card className="card-holder">
                                        <CardHeader
                                            title={post.title}
                                            subtitle= {post.author}
                                            actAsExpander={true}
                                        />
                                        <CardActions>
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

const mapStateToProps = ({posts}) => ({posts});

export default connect(mapStateToProps,action) (HomePage);