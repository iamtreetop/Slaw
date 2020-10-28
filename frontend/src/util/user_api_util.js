import axios from 'axios';

export const updateUser = (user) => {
    let channels = {channels: user.channels};
    return axios.patch('/api/users/' + user.id, channels);
}