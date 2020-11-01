import { connect } from 'react-redux';
import { updateEvent, fetchEvent } from '../../actions/event_actions';
import { createTodo } from "../../util/todo_api_util";
import TodoForm from "../todos/todo_form";
import { withRouter } from 'react-router-dom';

import { closeModal } from '../../actions/modal_actions';

const mstp = (state, ownProps) =>{
    //debugger
    return {
        todo: {
            title: "",
            status: false
        },
        eventId: state.ui.modal.id
    }
}

const mdtp = (dispatch) => {
    return {
        createTodo: (todo) => createTodo(todo),
        updateEvent: (event) => dispatch(updateEvent(event)),
        fetchEvent: (eventId) => dispatch(fetchEvent(eventId)),
        closeModal: () => dispatch(closeModal())
    }
}


export default withRouter(connect(mstp, mdtp)(TodoForm));