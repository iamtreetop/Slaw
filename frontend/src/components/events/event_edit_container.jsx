import { connect } from 'react-redux';
import { updateEvent, fetchEvent } from '../../actions/event_actions';
import EventForm from "../events/eventform";
import { withRouter } from 'react-router-dom';

const mstp = (state, ownProps) => {
    return {
        event: {
            id: ownProps.match.params.eventId,
            title: state.events[ownProps.match.params.eventId].title,
            description: state.events[ownProps.match.params.eventId].description,
            date: state.events[ownProps.match.params.eventId].date
        },
        formType: "edit"
    }
}

const mdtp = (dispatch) => {
    return {
        fetchEvent: (eventId) => dispatch(fetchEvent(eventId)),
        updateEvent: (event) => dispatch(updateEvent(event))
    }
}


export default withRouter(connect(mstp, mdtp)(EventForm));