import * as api from '../utils/api';

export const FETCH_CATEGORIES ='FETCH_CATEGORIES';

export function fetchCategories() {
    console.log(api.fetchCategories());
    return{
        type: FETCH_CATEGORIES,
        payload: api.fetchCategories(),
    };
}