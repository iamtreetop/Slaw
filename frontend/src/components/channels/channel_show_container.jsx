import { connect } from 'react-redux';
import { fetchChannel } from '../../actions/channel_actions';
import { fetchEvents } from '../../actions/event_actions';

import ChannelShow from "./channel_show";
import { withRouter } from 'react-router-dom';

const mstp = (state, ownProps) => {
    return {
        channel: state.channels[ownProps.match.params.channelId]
    }
}

const mdtp = (dispatch, ownProps) => {
    return {
        fetchChannel: () => dispatch(fetchChannel(ownProps.match.params.channelId))
    }
}


export default withRouter(connect(mstp, mdtp)(ChannelShow));