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

export const updateEvent = (event) => {
    return axios.patch('/api/events/' + event.id, event);
}

export const deleteEvent = (eventId) => {
  return axios.delete('/api/events/' + eventId);
}