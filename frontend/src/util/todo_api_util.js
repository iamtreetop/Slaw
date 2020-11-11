import axios from "axios";

export const fetchTodos = () => {
    return axios.get('/api/todos')
};

export const fetchTodo = (todoId) => {
    return axios.get('/api/todos/' + todoId)
};

export const createTodo = (todo) => {
    return axios.post('/api/todos/', todo)
}

export const updateTodo = (todo) => {
    return axios.patch('/api/todos/' + todo.id, todo)
}

export const deleteTodo = (todoId) => {
    return axios.delete('/api/todos/' + todoId)
}