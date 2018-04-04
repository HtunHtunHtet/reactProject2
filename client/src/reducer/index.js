import { combineReducers } from "redux";
import { RECEIVE_CATEGORIES  , RECEIVE_POSTS} from "../actions";

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
        default:
            return state;
    }
}

export default combineReducers({
    receiveCategories, posts
});
