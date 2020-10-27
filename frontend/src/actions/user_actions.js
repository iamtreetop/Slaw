import * as UserAPIUtil from '../util/user_api_util';

export const RECEIVE_USER = "RECEIVE_USER";

export const receiveUser = user => {
    return {
        type: RECEIVE_USER,
        user
    }
}


export const updateUser = (user) => {
    return (dispatch) => {
        return UserAPIUtil.updateUser(user).then( (user) => {
            return dispatch( receiveUser(user) )
        }).catch(err => console.log(err))
    }
}