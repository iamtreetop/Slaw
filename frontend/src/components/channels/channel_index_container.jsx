import { connect } from 'react-redux';
import { fetchChannels, updateChannel } from '../../actions/channel_actions';
import ChannelIndex from './channel_index';
import { openModal } from '../../actions/modal_actions';
import { updateUser } from "../../actions/user_actions";

const mstp = (state) =>{
    return {
        channels: Object.values(state.channels),
        user: state.users,
        channelObjects: state.channels
    }
}

const mdtp = (dispatch) => {
    return {
        fetchChannels: () => dispatch(fetchChannels()),
        updateChannel: (channel) => dispatch(updateChannel(channel)),
        updateUser: (user) => dispatch(updateUser(user)),
        openModal: (modal, id) => (dispatch(openModal(modal, id)))
    }
}


export default connect(mstp, mdtp)(ChannelIndex);