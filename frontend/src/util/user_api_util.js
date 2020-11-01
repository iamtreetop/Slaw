import axios from 'axios';

export const updateUser = (user) => {
    return axios.patch('/api/users/' + user.id, user);
}

export const fetchUser = () => {
    return axios.get('api/users/current')
}