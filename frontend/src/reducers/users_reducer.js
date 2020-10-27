import {
    RECEIVE_USER
} from '../actions/user_actions';

const UserReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({},state);
    
    switch (action.type) {
        case RECEIVE_USER:
            //debugger
            newState[action.user.data._id] = action.user.data;
            return newState;
    
        default:
            return state;
    }
}

export default UserReducer;