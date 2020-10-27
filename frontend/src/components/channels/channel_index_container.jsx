import { connect } from 'react-redux';
import { fetchChannels, updateChannel } from '../../actions/channel_actions';
import ChannelIndex from './channel_index';
import { openModal } from '../../actions/modal_actions';


const mstp = (state) =>{
    return {
        channels: Object.values(state.channels),
        userId: state.session.user.id
    }
}

const mdtp = (dispatch) => {
    return {
        fetchChannels: () => dispatch(fetchChannels()),
        updateChannel: (channel) => dispatch(updateChannel(channel)),
        openModal: (modal, id) => (dispatch(openModal(modal, id)))
    }
}


export default connect(mstp, mdtp)(ChannelIndex);