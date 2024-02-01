import { API_METHOD } from 'src/constants/consts';
import api from './common';

const todoApi = {
  getListTodoApp: () => api(API_METHOD.GET, '/todo-list'),
  createTodoApp: (body) => api(API_METHOD.POST, '/create-todo', body),
  updateTodoApp: (body) => api(API_METHOD.POST, '/update-todo', body),
  deleteTodoApp: (body) => api(API_METHOD.DELETE, '/delete-todo', body),
};

export default todoApi;
