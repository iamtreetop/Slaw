import {
    RECEIVE_TODO,
    REMOVE_TODO
} from '../actions/todo_actions';

const TodoReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({},state);
    // debugger
    switch (action.type) {
        case RECEIVE_TODO:
            // debugger
            action.todos.data.forEach((todo)=>{
                newState[todo._id] = todo;
            })
            return newState;
        default:
            return state;
    }
}

export default TodoReducer;