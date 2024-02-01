import { TYPE } from '../constants';

const initialState = {
  todoList: [],
  selectedTodo: null,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPE.GET_LIST_TODO:
      return {
        ...state,
      };

    case TYPE.GET_LIST_TODO_SUCCESS:
      return {
        ...state,
        todoList: action.payload.todoList.todoApp,
      };

    case TYPE.GET_LIST_TODO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case TYPE.SET_SELECTED_TODO:
      return {
        ...state,
        selectedTodo: action.payload,
      };

    default:
      return state;
  }
};

export default todoReducer;
