import { connect } from 'react-redux';
import { fetchChannels } from '../../actions/channel_actions';
import { openModal } from '../../actions/modal_actions';
import SideBar from './sidebar';


const mstp = (state) => {
    return {
        channels: Object.values(state.channels)
    }
}

const mdtp = (dispatch) => {
    return {
        fetchChannels: () => dispatch(fetchChannels()),
        openModal: (modal, id) => (dispatch(openModal(modal, id)))
    }
}


export default connect(mstp, mdtp)(SideBar);