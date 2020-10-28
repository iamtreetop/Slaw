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
        title: req.body.title, 
        description: req.body.description,
        date: req.body.date,
        todo: req.body.todo,
        participants: req.body.participants
    };
    return axios.patch('/api/channels/' + event.id, newDetails);
}