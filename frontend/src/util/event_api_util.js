import axios from 'axios';

export const fetchEvents = () => {
  return axios.get('/api/events')
};

export const fetchEvent = (eventId) => {
    return axios.get('/api/events/'+ eventId)
}

export const createEvent = (event) => {
  return axios.post('/api/events/create', event)
}