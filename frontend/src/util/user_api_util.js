import axios from 'axios';

export const updateUser = (user) => {
    let channels = {channels: user.channels};
    return axios.patch('/api/users/' + user.id, channels);
}

export const updateUser1 = (user) => {
    let channels = { channels: user.channels };
    return axios.patch('/api/users/' + user.userId, channels);
}

export const fetchUser = () => {
    return axios.get('api/users/current')
}