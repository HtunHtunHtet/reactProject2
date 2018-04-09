import * as api from '../utils/api';

export const RECEIVE_CATEGORIES= 'RECEIVE_CATEGORIES';
export const RECEIVE_POSTS     = 'RECEIVE_POSTS';
export const ADD_POST          = 'ADD_POST';
export const DELETE_POST       = "DELETE_POST";

export const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
});

export const receiveCategories = categories => ({
    type: RECEIVE_CATEGORIES,
    categories
});

//fetch all categories
export const fetchCategories = () => dispatch =>
    api
        .getAllCategories()
        .then(categories => dispatch(receiveCategories(categories)));


//fetch all posts
export const fetchPosts = () => dispatch =>
    api
        .getAllPosts()
        .then(posts =>
            Promise.all(
                posts.map(post =>
                    api
                        .getComments(post.id)
                        .then(comments => (post.comments = comments))
                        .then(() => post)
                )
            )
        )
        .then(posts => dispatch(receivePosts(posts)));

//add post
export const addPost = post  => ({
    type: ADD_POST,
    post
});
export const fetchAddPost = post => dispatch =>
    api.addPost(post).then(post => dispatch(addPost(post)));

//Delete Post
export const deletePost = postId => ({
    type: DELETE_POST,
    postId
});

export const fetchDeletePost = postId => dispatch =>
    api.deletePost(postId).then(post => dispatch(deletePost(postId)));