import * as ChannelAPIUtil from '../util/channel_api_util';

export const RECEIVE_CHANNELS = "RECEIVE_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const REMOVE_CHANNEL = "REMOVE_CHANNEL";

export const receiveChannels = channels => {
    return {
        type: RECEIVE_CHANNELS,
        channels
    }
}

export const receiveChannel = channel => {
    return {
        type: RECEIVE_CHANNEL,
        channel
    }
}

export const removeChannel = channelId => {
    return {
        type: REMOVE_CHANNEL,
        channelId
    }
}

export const fetchChannels = () => {
    return (dispatch) => {
        return ChannelAPIUtil.fetchChannels().then( (channels) => {
            return dispatch( receiveChannels(channels) )
        }).catch(err => console.log(err))
    }
}

export const fetchChannel = (channelId) => {
    return (dispatch) => {
        return ChannelAPIUtil.fetchChannel(channelId).then( (channel) => {
            return dispatch( receiveChannel(channel) )
        }).catch(err => console.log(err))
    }
}

export const createChannel = (channel) => {
    
    return (dispatch) => {
        return ChannelAPIUtil.createChannel(channel).then( (channel) => {
            return dispatch( receiveChannel(channel) )
        }).catch(err => console.log(err))
    }
}

export const updateChannel = (channel) => {
    return (dispatch) => {
        return ChannelAPIUtil.updateChannel(channel).then( (channel) => {
            return dispatch( receiveChannel(channel) )
        }).catch(err => console.log(err))
    }
}

export const deleteChannel = (channelId) => {
    return (dispatch) => {
        return ChannelAPIUtil.deleteChannel(channelId).then( () => {
            return dispatch( removeChannel(channelId) )
        }).catch(err => console.log(err))
    }
}