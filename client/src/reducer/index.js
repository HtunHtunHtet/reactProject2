import { combineReducers } from "redux";
import { RECEIVE_CATEGORIES } from "../actions";

function receiveCategories (state = {} , action){
    switch(action.type){
        case RECEIVE_CATEGORIES:
            return action.categories;
        default:
            return state;
    }
}

export default combineReducers({
    receiveCategories
});
