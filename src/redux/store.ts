// src/redux/store.js
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import todoAppReducer from './reducers/todo';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  TodoApp: todoAppReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export type RootState = ReturnType<typeof store.getState>;
export default store;
