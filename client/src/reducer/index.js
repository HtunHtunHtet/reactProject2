import { combineReducers } from "redux";
import { RECEIVE_CATEGORIES ,
         RECEIVE_POSTS,
         ADD_POST,
         DELETE_POST,
         EDIT_POST,
         GET_SINGLE_POST,
         GET_POSTS_CATEGORY,
         GET_COMMENTS,
         GET_COMMENT,
         ADD_COMMENT,
         DELETE_COMMENT,
         EDIT_COMMENT,
         VOTE,
         VOTE_COMMENT
        } from "../actions";

function receiveCategories (state = {} , action){
    switch(action.type){
        case RECEIVE_CATEGORIES:
            return action.categories;
        default:
            return state;
    }
}

function posts (state= {} ,action){
    switch(action.type){
        case RECEIVE_POSTS:
            return {
                ...state,
                posts: action.posts
            }
        case ADD_POST:
            return { ...state, ...action.post };
        case DELETE_POST:
            const availablePosts = state.posts.filter(
                item => item.id !== action.postId
            );
            return {
                ...state,
                posts: availablePosts
            };
        case EDIT_POST:
            return { ...state, ...action.post };
        case GET_SINGLE_POST:
            return { ...state, posts: [action.posts] };
        case GET_POSTS_CATEGORY:
            return { ...state, posts: action.posts };
        case VOTE:
            const updatedPosts = state.posts.map(item => {
                if (item.id === action.payload.id) {
                    item.voteScore = action.payload.voteScore;
                }
                return item;
            });
            return {
                ...state,
                posts: updatedPosts
            };
        case VOTE_COMMENT:
            const updatedComments = state.comments.map(item => {
                if (item.id === action.commentId.id) {
                    item.voteScore = action.commentId.voteScore;
                }
                return item;
            });
            return {
                ...state,
                comments: updatedComments
            };
        default:
            return state;
    }
}

function receiveComment(state = {}, action) {
    switch (action.type) {
        case GET_COMMENT:
            return action.comments;
        default:
            return state;
    }
}

function getComments(state = {}, action) {
    switch (action.type) {
        case GET_COMMENTS:
            return { ...state, comments: action.comments };
        case ADD_COMMENT:
            return { ...state, comments: state.comments.concat(action.comment) };
        case EDIT_COMMENT:
            return { ...state, ...action.comment };
        case DELETE_COMMENT:
            const availableComments = state.comments.filter(
                item => item.id !== action.commentId
            );
            return {
                ...state,
                comments: availableComments
            };
        default:
            return state;
    }
}

export default combineReducers({
    receiveCategories, posts ,receiveComment , getComments
});
