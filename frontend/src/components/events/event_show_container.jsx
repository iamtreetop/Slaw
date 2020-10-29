import { connect } from 'react-redux';
import EventShow from "../events/event_show";
import { withRouter } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';
import { fetchEvent } from '../../actions/event_actions';
import { updateTodo } from '../../util/todo_api_util';

const mstp = (state, ownProps) => {
    //debugger
    return {
        eventId: ownProps.match.params.eventId
    }
}

const mdtp = (dispatch) => {
    return {
        fetchEvent: (eventId) => dispatch(fetchEvent(eventId)),
        updateTodo: (todo) => updateTodo(todo),
        openModal: (modal, id) => (dispatch(openModal(modal, id)))
    }
}


export default withRouter(connect(mstp, mdtp)(EventShow));