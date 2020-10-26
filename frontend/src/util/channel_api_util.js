import axios from 'axios';

export const fetchChannels = () => {
  return axios.get('/api/channels')
};

export const fetchChannel = (channelId) => {
    return axios.get('/api/channels/'+ channelId)
}

export const createChannel = channel => {
  return axios.post('/api/channels/', channel)
}