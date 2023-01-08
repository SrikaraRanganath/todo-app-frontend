import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5001' });
api.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        const profile = JSON.parse (localStorage.getItem('profile'));
        req.headers.Authorization = `Bearer ${profile.token}`;
    }
    return req;
});

export const fetchTodos =async(id) => {
    return api.get(`/todo/${id}`);
}

export const createTodo = async(id, data) => {
    return api.post(`/todo/${id}`, data)
}

export const editTodo = async(todoID, data) => {
    return api.patch(`/todo/${todoID}`, data);
}

export const removeTodo = async(todoID) => {
    return api.delete(`/todo/${todoID}`);
}