import { connect } from 'react-redux';
import { fetchChannels } from '../../actions/channel_actions';
import ChannelIndex from './channel_index';

const mstp = (state) =>{
    return {
        channels: Object.values(state.channels.all)
    }
}

const mdtp = (dispatch) => {
    return {
        fetchChannels: () => dispatch(fetchChannels())
    }
}


export default connect(mstp, mdtp)(ChannelIndex);