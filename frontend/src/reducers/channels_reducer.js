import {
    RECEIVE_CHANNELS,
    RECEIVE_CHANNEL
} from '../actions/channel_actions';

const ChannelReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({},state);
    
    switch (action.type) {
        case RECEIVE_CHANNELS:
            newState = action.channels.data;
            return newState;
        case RECEIVE_CHANNEL:
            newState[action.channel.id] = action.channel.data;
            return newState;
    
        default:
            return state;
    }
}

export default ChannelReducer;