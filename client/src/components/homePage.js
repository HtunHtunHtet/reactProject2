import React, {Component} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import  * as action from '../actions'
import AppBar from 'material-ui/AppBar';
import Menu from './menu'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class HomePage extends Component {

    //Get all posts
    componentDidMount(){
        this.props.fetchPosts();
    }

    render(){
        const {posts} = this.props.posts;
        return(
            <MuiThemeProvider>
                <div className="appbar-wrapper">
                    <AppBar
                        title="Readable"
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                        onClick = {this.handleToggle}
                    />
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
                                            <FlatButton label="Delete Posts" />
                                            <FlatButton label="Edit Posts" />
                                        </CardActions>
                                        <CardText expandable = {true}>
                                            {post.body}
                                        </CardText>
                                    </Card>
                                )
                            )
                    }

                </div>
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = ({posts}) => ({posts});

export default connect(mapStateToProps,action) (HomePage);