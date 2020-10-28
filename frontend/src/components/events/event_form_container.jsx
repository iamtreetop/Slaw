import { connect } from 'react-redux';
import { createEvent } from '../../actions/event_actions';
import EventForm from "../channels/channel_form";
import { withRouter } from 'react-router-dom';

const mstp = (state) => {
    return {
        channel: {
            date: "",
            title: "",
            description: "",
            participants: []
        }
    }
}

const mdtp = (dispatch) => {
    return {
        createEvent: (event) => dispatch(createEvent(event))
    }
}


export default withRouter(connect(mstp, mdtp)(EventForm));