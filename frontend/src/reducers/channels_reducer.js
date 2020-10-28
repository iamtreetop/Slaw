import {
    RECEIVE_CHANNELS,
    RECEIVE_CHANNEL
} from '../actions/channel_actions';

const ChannelReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({},state);
    
    switch (action.type) {
        case RECEIVE_CHANNELS:

            action.channels.data.forEach((channel)=>{
                newState[channel._id] = channel;
            })
            return newState;
        case RECEIVE_CHANNEL:
            // newState.channels[action.channel.data._id] = action.channel.data;
            newState[action.channel.data._id] = action.channel.data;
            return newState;
    
        default:
            return state;
    }
}

export default ChannelReducer;