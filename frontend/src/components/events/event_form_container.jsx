import { connect } from 'react-redux';
import { createEvent } from '../../actions/event_actions';
import { updateChannel } from '../../actions/channel_actions'
import EventForm from "../events/eventform";
import { withRouter } from 'react-router-dom';

const mstp = (state, ownProps) => {
    return {
        event: {
            title: "",
            description: "",
            participants: []
        }
    }
}

const mdtp = (dispatch) => {
    return {
        createEvent: (event) => dispatch(createEvent(event)),
        updateChannel: (channel) => dispatch(updateChannel(channel))
    }
}


export default withRouter(connect(mstp, mdtp)(EventForm));