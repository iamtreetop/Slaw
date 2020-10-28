import { connect } from 'react-redux';
import { createChannel } from '../../actions/channel_actions';
import { createEvent } from '../../actions/event_actions';
import ChannelForm from "./channel_form";
import { closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';

const mstp = (state) =>{
    return {
        channel: {
            admin: "",
            title: ""
        }
    }
}

const mdtp = (dispatch) => {
    return {
        createChannel: (channel) => dispatch(createChannel(channel)),
        closeModal: () => dispatch(closeModal()),
        createEvent: (event) => dispatch(createEvent(event))
        // Would have something to clear eerrors?
    }
}


export default withRouter(connect(mstp, mdtp)(ChannelForm));