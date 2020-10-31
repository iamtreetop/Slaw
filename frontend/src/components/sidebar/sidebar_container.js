import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { fetchChannels } from '../../actions/channel_actions';
import { fetchUser } from "../../actions/user_actions"
import { openModal } from '../../actions/modal_actions';
import SideBar from './sidebar';


const mstp = (state) => {
    return {
        channels: state.channels,
        // currentUser: state.session.user,
        user: state.users
    }
}

const mdtp = (dispatch) => {
    return {
        fetchChannels: () => dispatch(fetchChannels()),
        fetchUser: () => dispatch(fetchUser()),
        openModal: (modal, id) => (dispatch(openModal(modal, id)))
    }
}


export default withRouter(connect(mstp, mdtp)(SideBar));