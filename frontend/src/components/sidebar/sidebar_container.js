import { connect } from 'react-redux';
import { fetchChannels } from '../../actions/channel_actions';
import { openModal } from '../../actions/modal_actions';
import SideBar from './sidebar';


const mstp = (state) => {
    return {
        channels: state.channels,
        currentUser: state.session.user
    }
}

const mdtp = (dispatch) => {
    return {
        fetchChannels: () => dispatch(fetchChannels()),
        openModal: (modal, id) => (dispatch(openModal(modal, id)))
    }
}


export default connect(mstp, mdtp)(SideBar);