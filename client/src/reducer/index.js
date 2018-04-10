import { combineReducers } from "redux";
import { RECEIVE_CATEGORIES ,
         RECEIVE_POSTS,
         ADD_POST,
         DELETE_POST,
         EDIT_POST,
         GET_SINGLE_POST
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
        default:
            return state;
    }
}

export default combineReducers({
    receiveCategories, posts
});
