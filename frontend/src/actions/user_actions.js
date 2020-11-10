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

export const fetchUser = () => {
    return (dispatch) => {
        return UserAPIUtil.fetchUser().then((user) => {
            return dispatch(receiveUser(user))
        }).catch(err => console.log(err))
    }
}

export const fetchUser2 = (userId) => {
    return (dispatch) => {
        return UserAPIUtil.fetchUser2(userId).then((user) => {
            return dispatch(receiveUser(user))
        }).catch(err => console.log(err))
    }
}