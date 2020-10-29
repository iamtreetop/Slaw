import { connect } from 'react-redux';
import EventShow from "../events/event_show";
import { withRouter } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';
import { fetchEvent } from '../../actions/event_actions';
import { updateTodo } from '../../util/todo_api_util';
import { fetchChannel } from '../../actions/channel_actions';


const mstp = (state, ownProps) => {
    // debugger
    return {
        eventId: ownProps.match.params.eventId,
        channel: state.channels[ownProps.match.params.channelId]
    }
}

const mdtp = (dispatch, ownProps) => {
    return {
        fetchChannel: () => dispatch(fetchChannel(ownProps.match.params.channelId)),
        updateTodo: (todo) => updateTodo(todo),
        openModal: (modal, id) => (dispatch(openModal(modal, id))),
        fetchEvent: (eventId) => dispatch(fetchEvent(eventId))
    }
}


export default withRouter(connect(mstp, mdtp)(EventShow));