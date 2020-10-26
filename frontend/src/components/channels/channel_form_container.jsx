import { connect } from 'react-redux';
import { createChannel } from '../../actions/channel_actions';
import ChannelForm from "./channel_form";
import withRouter from 'react-router-dom';

const mstp = (state) =>{
    return {
        channel: {
            admin: "",
            date: "",
            title: ""
        }
    }
}

const mdtp = (dispatch) => {
    return {
        createChannel: (channel) => dispatch(createChannel(channel))
    }
}


export default withRouter(connect(mstp, mdtp)(ChannelForm));