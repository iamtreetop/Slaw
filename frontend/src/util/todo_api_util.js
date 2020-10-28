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
    let newDetails = { 
        title: todo.title, 
        description: todo.description,
        status: todo.status,
    };
    return axios.patch('/api/todos/' + todo.id, newDetails)
}

export const deleteTodo = (todoId) => {
    return axios.delete('/api/todos' + todoId)
}