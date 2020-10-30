import * as EventAPIUtil from '../util/event_api_util';

export const RECEIVE_EVENTS = "RECEIVE_EVENTS";
export const RECEIVE_EVENT= "RECEIVE_EVENT";
export const REMOVE_EVENT = "REMOVE_EVENT";

export const receiveEvents = events => {
    return {
        type: RECEIVE_EVENTS,
        events
    }
}

export const receiveEvent = event => {
    return {
        type: RECEIVE_EVENT,
        event
    }
}

export const removeEvent = eventId => {
    return {
        type: REMOVE_EVENT,
        eventId
    }
}

export const fetchEvents = () => {
    return (dispatch) => {
        return EventAPIUtil.fetchEvents().then((events) => {
            return dispatch(receiveEvents(events))
        }).catch(err => console.log(err))
    }
}

export const fetchEvent = (eventId) => {
    return (dispatch) => {
        return EventAPIUtil.fetchEvent(eventId).then((event) => {
            // debugger
            return dispatch(receiveEvent(event))
        }).catch(err => console.log(err))
    }
}

export const createEvent = (event) => {
    return (dispatch) => {
        return EventAPIUtil.createEvent(event).then((event) => {
            return dispatch(receiveEvent(event))
        }).catch(err => console.log(err))
    }
}

export const updateEvent = (event) => {
    return (dispatch) => {
        return EventAPIUtil.updateEvent(event).then((event) => {
            return dispatch(receiveEvent(event))
        }).catch(err => console.log(err))
    }
}

export const deleteEvent = (eventId) => {
    return (dispatch) => {
        return EventAPIUtil.deleteEvent(eventId).then(() => {
            return dispatch(removeEvent(eventId))
        }).catch(err => console.log(err))
    }
}