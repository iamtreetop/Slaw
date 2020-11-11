import { connect } from 'react-redux';
import { createEvent } from '../../actions/event_actions';
import { updateChannel, fetchChannels } from '../../actions/channel_actions'
import { withRouter } from 'react-router-dom';
import SlawMap from "./map";

const mstp = (state, ownProps) => {
    return {
        event: {
            title: "",
            description: "",
            participants: []
        },
        user: state.users,
        channels: state.channels,
        redirect: ownProps.history.push
    }
}

const mdtp = (dispatch, ownProps) => {
    return {
        createEvent: (event) => dispatch(createEvent(event)),
        updateChannel: (channel) => dispatch(updateChannel(channel)),
        fetchChannels: () => dispatch(fetchChannels())
    }
}


export default withRouter(connect(mstp, mdtp)(SlawMap));