import { connect } from 'react-redux';
import EventShow from "../events/event_show";
import { withRouter } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';
import { fetchEvent, updateEvent } from '../../actions/event_actions';
import { updateTodo } from '../../util/todo_api_util';
import { fetchChannel, updateChannel } from '../../actions/channel_actions';
import { createComment } from "../../util/comment_api_util"
import { updateUser } from '../../actions/user_actions';

const mstp = (state, ownProps) => {
    return {
        eventId: ownProps.match.params.eventId,
        event: state.events,
        channel: state.channels[ownProps.match.params.channelId],
        handle: state.session.user.handle,
        userId: state.session.user.id
    }
}

const mdtp = (dispatch, ownProps) => {
    return {
        fetchChannel: () => dispatch(fetchChannel(ownProps.match.params.channelId)),
        updateTodo: (todo) => updateTodo(todo),
        openModal: (modal, id) => (dispatch(openModal(modal, id))),
        fetchEvent: (eventId) => dispatch(fetchEvent(eventId)),
        updateChannel: (channel) => dispatch(updateChannel(channel)),
        createComment: (comment) => createComment(comment),
        updateEvent: (event) => dispatch(updateEvent(event)),
        updateUser: (user) => dispatch(updateUser(user))
    }
}


export default withRouter(connect(mstp, mdtp)(EventShow));