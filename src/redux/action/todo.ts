import { TYPE } from '../constants';

const getListTodoApp = () => ({
  type: TYPE.GET_LIST_TODO,
});

const getListTodoSuccess = (params) => ({
  type: TYPE.GET_LIST_TODO_SUCCESS,
  payload: params,
});

const getListTodoError = (params) => ({
  type: TYPE.GET_LIST_TODO_ERROR,
  payload: params,
});

const actSetSelectedTodo = (params) => ({
  type: TYPE.SET_SELECTED_TODO,
  payload: params,
});

const actCreateTodo = (params) => ({
  type: TYPE.CREATE_TODO,
  payload: params,
});

const actUpdateTodo = (params) => ({
  type: TYPE.UPDATE_TODO,
  payload: params,
});

const actDeleteTodo = (params) => ({
  type: TYPE.DELETE_TODO,
  payload: params,
});

export {
  getListTodoSuccess,
  getListTodoError,
  getListTodoApp,
  actSetSelectedTodo,
  actCreateTodo,
  actUpdateTodo,
  actDeleteTodo,
};
