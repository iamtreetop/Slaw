import * as CommentAPIUtil from "../util/comment_api_util"

export const RECEIVE_COMMENT = "RECEIVE_COMMENT"
export const REMOVE_COMMENT = "REMOVE_COMMENT"

const receiveComment = (comment) => {
    return {
        type: RECEIVE_COMMENT,
        comment
    }
}

const removeComment = (commentId) => {
    return {
        type: REMOVE_COMMENT,
        commentId
    }
}

export const createComment = (comment) => (dispatch) => {
    return CommentAPIUtil.createComment(comment).then((resp) =>{
        dispatch(receiveComment(resp))
    }).fail((err) => {
        console.log(err)
    })
}

export const deleteComment = (commentId) => (dispatch) => {
    return CommentAPIUtil.deleteComment(commentId).then((resp) => {
        dispatch(removeComment(resp))
    }).fail((err) => {
        console.log(err)
    })
}


