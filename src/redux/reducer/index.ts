import { combineReducers } from 'redux';
import todoReducer from './todo';

const rootReducer = combineReducers({
  TodoApp: todoReducer,
});

export default rootReducer;
