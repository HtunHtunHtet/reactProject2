//Root URL
const ROOT_URL = 'http://localhost:3001'

//Constant Header
const headers  = {
    'Accept': 'application/json',
    'Authorization': 'authorized'
}

export const fetchCategories = () => {
    return fetch(`${ROOT_URL}/categories`, { headers })
            .then((res) => res.json());

}