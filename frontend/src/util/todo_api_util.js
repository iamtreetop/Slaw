import axios from "axios";

export const fetchTodos = () => {
    return axios.get('/api/todos')
};

export const fetchTodo = (todoId) => {
    return axios.get('/api/todos/' + todoId)
};

export const createTodo = (todo) => {
    // debugger
    return axios.post('/api/todos/', todo)
}

export const updateTodo = (todo) => {
    // let newDetails = { 
    //     title: todo.title,
    //     status: todo.status,
    // };
    return axios.patch('/api/todos/' + todo.id, todo)
}

export const deleteTodo = (todoId) => {
    // debugger
    return axios.delete('/api/todos/' + todoId)
}