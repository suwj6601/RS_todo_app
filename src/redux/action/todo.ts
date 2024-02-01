import { ACTION_TYPE } from '../constants';

const getListTodoApp = () => ({
  type: ACTION_TYPE.GET_LIST_TODO,
});

const getListTodoSuccess = (params) => ({
  type: ACTION_TYPE.GET_LIST_TODO_SUCCESS,
  payload: params,
});

const getListTodoError = (params) => ({
  type: ACTION_TYPE.GET_LIST_TODO_ERROR,
  payload: params,
});

const actSetSelectedTodo = (params) => ({
  type: ACTION_TYPE.SET_SELECTED_TODO,
  payload: params,
});

const actCreateTodo = (params) => ({
  type: ACTION_TYPE.CREATE_TODO,
  payload: params,
});

const actUpdateTodo = (params) => ({
  type: ACTION_TYPE.UPDATE_TODO,
  payload: params,
});

const actDeleteTodo = (params) => ({
  type: ACTION_TYPE.DELETE_TODO,
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
