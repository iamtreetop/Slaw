import axios from 'axios';

export const createComment = (comment) => {
    //debugger
    return axios.post('/api/comments/', comment)
}

export const deleteComment = comment => {
    return axios.post('/api/comment/' + comment.id, comment)
}