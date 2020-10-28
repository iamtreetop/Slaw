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
    let newDetails = { 
        title: event.title, 
        description: event.description,
        date: event.date,
        todo: event.todo,
        participants: event.participants
    };
    return axios.patch('/api/channels/' + event.id, newDetails);
}