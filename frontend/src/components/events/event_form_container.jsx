import { connect } from 'react-redux';
import { createEvent } from '../../actions/event_actions';
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
        createEvent: (event) => dispatch(createEvent(event))
    }
}


export default withRouter(connect(mstp, mdtp)(EventForm));