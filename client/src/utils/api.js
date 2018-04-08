//Root URL
const ROOT_URL = 'http://localhost:3001'

//Generate Token
let token = localStorage.token;

if(!token){
    token = localStorage.token = Math.random().toString(36).substring(-8);
}

//Constant Header
const headers  = {
    Accept: "application/json",
    Authorization: token,
    "Content-Type": "application/json"
}

export const getAllCategories = () =>
    fetch(`${ROOT_URL}/categories`, { headers })
        .then(res => res.json())
        .then(data => data.categories);

export const getAllPosts = () =>
    fetch (`${ROOT_URL}/posts`,{
        headers
    }).then (res => res.json());

export const getComments = postId =>
    fetch(`${ROOT_URL}/posts/${postId}/comments`, { headers }).then(response =>
        response.json().then(data => data)
    );

export const addPost = post =>
    fetch(`${ROOT_URL}/posts`, {
        method: "POST",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    }).then(data => data.json());