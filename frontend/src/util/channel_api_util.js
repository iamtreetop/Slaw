import axios from 'axios';

export const fetchChannels = () => {
  return axios.get('/api/channels')
};

export const fetchChannel = (channelId) => {
  return axios.get('/api/channels/' + channelId)
}

export const createChannel = channel => {
  // debugger
  return axios.post('/api/channels/', channel)
}

export const updateChannel = (channel) => {
  let members = { members: channel.members };
  return axios.patch('/api/channels/' + channel.id, members);
}

export const deleteChannel = (channelId) => {
  return axios.delete('/api/channels/' + channelId);
}