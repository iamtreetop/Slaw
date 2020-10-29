import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import ChannelFormContainer from '../channels/channel_form_container';
import TodoFormContainer from "../todos/todo_form_container";
import "./modal.css"


const Modal = ({ modal, closeModal }) => {
    if (!modal) {
        return null;
    }
    let component = null;
    switch (modal) {
        case 'channel':
            component = <ChannelFormContainer />;
            break;
        case 'todo':
            component = <TodoFormContainer id={modal.id} />;
            break;    
        default:
            return null;
    }
    return (
        <div className="modal-background" onClick={closeModal}>
            <div className="modal-child" onClick={e => e.stopPropagation()}>
                {component}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    if (!state.ui.modal) {
        return {
            modal: null
        }
    } else {
        return {
            modal: state.ui.modal.modal,
            id: state.ui.modal.id
        };

    }
};

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
