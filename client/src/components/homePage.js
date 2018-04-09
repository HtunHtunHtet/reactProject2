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

class HomePage extends Component {

    //Get all posts
    componentDidMount(){
        this.props.fetchPosts();
    }

    deletePost = postId => {
        this.props.fetchDeletePost(postId);
    };


    render(){
        const {posts} = this.props.posts;
        console.log(this.props.posts);
        return(
            <MuiThemeProvider>
                <div className="appbar-wrapper">
                   <Link to="/">
                    <AppBar
                        title="Readable"
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                        onClick = {this.handleToggle}
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
                                            showExpandableButton={true}
                                        />
                                        <CardActions>
                                            <FlatButton label="Delete Posts" onClick={() => this.deletePost(post.id)}/>
                                            <FlatButton label="Edit Posts" />
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