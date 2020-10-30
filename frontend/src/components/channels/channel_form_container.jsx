import { connect } from 'react-redux';
import { createChannel } from '../../actions/channel_actions';
import { createEvent } from '../../actions/event_actions';
import ChannelForm from "./channel_form";
import { closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';
import { updatePicture } from "../../util/channel_api_util"
import { updateUser1 } from "../../actions/user_actions"


const mstp = (state) =>{
    return {
        user: state.session.user,
        channel: {
            admin: "",
            date: "",
            title: "",
            members: [],
            events: [],
            imageFile: null,
            imageUrl: null,
            channelForm: ""
        }
    }
}

const mdtp = (dispatch) => {
    return {
        createChannel: (channel) => dispatch(createChannel(channel)),
        createEvent: (event) => dispatch(createEvent(event)),
        closeModal: () => dispatch(closeModal()),
        updatePicture: (image) => updatePicture(image),
        updateUser1: (user) => dispatch(updateUser1(user))
        // Would have something to clear eerrors?
    }
}


export default withRouter(connect(mstp, mdtp)(ChannelForm));