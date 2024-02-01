import { ACTION_TYPE } from '../constants';

const initialState = {
  todoList: [],
  selectedTodo: null,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_LIST_TODO:
      return {
        ...state,
      };

    case ACTION_TYPE.GET_LIST_TODO_SUCCESS:
      return {
        ...state,
        todoList: action.payload.todoList.todoApp,
      };

    case ACTION_TYPE.GET_LIST_TODO_ERROR:
      return {
        ...state,
      };

    case ACTION_TYPE.SET_SELECTED_TODO:
      return {
        ...state,
        selectedTodo: action.payload,
      };

    default:
      return state;
  }
};

export default todoReducer;
