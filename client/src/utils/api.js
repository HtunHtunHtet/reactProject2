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

//get comments for a post
export const getComments = postId =>
    fetch(`${ROOT_URL}/posts/${postId}/comments`, { headers }).then(response =>
        response.json().then(data => data)
    );

//get single comment for editing
export const getComment = commentId =>
    fetch(`${ROOT_URL}/comments/${commentId}`, { headers }).then(res =>
        res.json().then(data => data)
    );

export const addComment = comment => {
    const body = JSON.stringify(comment);

    return fetch(`${ROOT_URL}/comments/`, {
        method: "POST",
        headers,
        body
    }).then(response => response.json());
};

export const addPost = post =>
    fetch(`${ROOT_URL}/posts`, {
        method: "POST",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    }).then(data => data.json());

//Delete Post
export const deletePost = postId => {
    return fetch(`${ROOT_URL}/posts/${postId}`, {
        method: "DELETE",
        headers
    }).then(res => res);
};


//Edit posts
export const editPost = (post, postId) => {
    return fetch(`${ROOT_URL}/posts/${postId}`, {
        method: "PUT",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    }).then(data => data.json());
};

export const getSinglePost = postId =>
    fetch(`${ROOT_URL}/posts/${postId}`, {
        headers
    }).then(res => res.json());

//Get Posts category
export const fetchPostsCategory = category =>
    fetch(`${ROOT_URL}/${category}/posts`, { headers }).then(data => data.json());

//Delete Comment
export const deleteComment = commentId => {
    return fetch(`${ROOT_URL}/comments/${commentId}`, {
        method: "DELETE",
        headers
    }).then(response => response.json());
};

//vote comment
export const voteComment = (commentId, option) => {
    return fetch(`${ROOT_URL}/comments/${commentId}`, {
        method: "POST",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            option: option
        })
    }).then(data => data.json());
};


export const votePost = (postId, option) =>
    fetch(`${ROOT_URL}/posts/${postId}`, {
        method: `POST`,
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ option })
    }).then(res => res.json());

export const editComment = (comment, commentId) => {
    return fetch(`${ROOT_URL}/comments/${commentId}`, {
        method: "PUT",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    }).then(data => data.json());
};