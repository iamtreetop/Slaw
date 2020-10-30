import axios from 'axios';

export const fetchChannels = () => {
  return axios.get('/api/channels')
};

export const fetchChannel = (channelId) => {
  return axios.get('/api/channels/' + channelId)
}

export const createChannel = channel => {

  return axios({
    method: 'post',
    url:'/api/channels/', 
    data: channel,
  })
}

export const updateChannel = (channel) => {
  return axios.patch('/api/channels/' + channel.id, channel);
}

export const deleteChannel = (channelId) => {
  return axios.delete('/api/channels/' + channelId);
}

export const updatePicture = (image) => {
  return axios.post(`/api/channels/add-channel-picture`, image)
}