import * as api from '../utils/api';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_POSTS      = 'RECEIVE_POSTS';
export const ADD_POST           = 'ADD_POST';
export const DELETE_POST        = "DELETE_POST";
export const EDIT_POST          = "EDIT_POST";
export const GET_SINGLE_POST    = "GET_SINGLE_POST";
export const GET_POSTS_CATEGORY = "GET_POSTS_CATEGORY";
export const GET_COMMENTS       = "GET_COMMENTS";
export const GET_COMMENT        = "GET_COMMENT";
export const ADD_COMMENT        = "ADD_COMMENT";
export const DELETE_COMMENT     = "DELETE_COMMENT";
export const EDIT_COMMENT       = "EDIT_COMMENT";
export const VOTE_COMMENT       = "VOTE_COMMENT";
export const VOTE               = "VOTE";
export const CHANGE_SORT = "CHANGE_SORT";

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

//edit post
export const editPost = (post, postId) => ({
    type: EDIT_POST,
    post,
    postId
});
export const fetchEditPost = (post, postId) => dispatch =>
    api.editPost(post, postId).then(post => dispatch(editPost(post)));

//get single post for edit
export const receiveSinglePost = posts => ({
    type: GET_SINGLE_POST,
    posts
});
export const fetchSinglePost = postId => dispatch =>
    api.getSinglePost(postId).then(posts => dispatch(receiveSinglePost(posts)));

export const fetchPostsCategory = category => dispatch =>
    api
        .fetchPostsCategory(category)
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
        .then(posts => dispatch(getPostsCategory(posts)));

export const getPostsCategory = posts => ({
    type: GET_POSTS_CATEGORY,
    posts
});

export const getComments = comments => ({
    type: GET_COMMENTS,
    comments
});

export const fetchComments = postId => dispatch =>
    api.getComments(postId).then(comments => dispatch(getComments(comments)));

//comment action
export const receiveComment = comments => ({
    type: GET_COMMENT,
    comments
});

export const fetchComment = commentId => dispatch =>
    api
        .getComment(commentId)
        .then(comments => dispatch(receiveComment(comments)));

//comment add
export const addComment = comment => ({
    type: ADD_COMMENT,
    comment
});
export const fetchAddComment = comment => dispatch =>
    api.addComment(comment).then(comment => dispatch(addComment(comment)));

// delete comment
export const deleteComment = commentId => ({
    type: DELETE_COMMENT,
    commentId
});
export const fetchDeleteComment = commentId => dispatch =>
    api
        .deleteComment(commentId)
        .then(comment => dispatch(deleteComment(commentId)));

//edit comment
export const editComment = (comment, commentId) => ({
    type: EDIT_COMMENT,
    comment,
    commentId
});

export const fetchEditComment = (comment, commentId) => dispatch =>
    api
        .editComment(comment, commentId)
        .then(comment => dispatch(editComment(comment)));

//vote POST
export const votePost = post => ({
    type: VOTE,
    payload: post
});

export const fetchVotePost = (postId, option) => dispatch =>
    api.votePost(postId, option).then(post => dispatch(votePost(post)));

//vote comment
export const voteComment = (commentId) => ({
    type: VOTE_COMMENT,
    commentId
});

export const fetchVoteComment = (commentId, option) => dispatch =>
    api
        .voteComment(commentId, option)
        .then(comment => dispatch(voteComment(comment)));

export const changeSortAction = value => {
    return {
        type: CHANGE_SORT,
        value: value
    };
};


