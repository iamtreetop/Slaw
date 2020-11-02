import * as TodoAPIUtil from '../util/todo_api_util'

// export const RECEIVE_TODOS = 'RECEIVE_TODOS';
export const RECEIVE_TODO = 'RECEIVE_TODO';
export const REMOVE_TODO = 'REMOVE_TOD)';

// export const receiveTodos = (todos) => {
//     return {
//         type: RECEIVE_TODOS,
//         todos
//     }
// }

export const receiveTodo = (todo) => {
    return {
        type: RECEIVE_TODO,
        todo
    }
}

export const removeTodo = (todoId) => {
    return {
        type: REMOVE_TODO,
        todoId
    }
}

export const createTodo = (todo) => {

    // return (dispatch) => {
        return TodoAPIUtil.createTodo(todo).then((res) => {
            console.log(res)
        }).catch(err => console.log(err))
    }
// }

export const updateTodo = (todo) => {
    // return (dispatch) => {
        return TodoAPIUtil.updateTodo(todo).then( (res) => {
            console.log(res);
        }).catch(err => console.log(err))
    // }
}

export const deleteTodo = (todoId) => {
    // return (dispatch) => {
        return TodoAPIUtil.deleteTodo(todoId).then((res) => {
             console.log(res)
        }).catch(err => console.log(err))
    }
// }