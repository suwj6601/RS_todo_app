import { all, call, put, takeEvery } from 'redux-saga/effects';
import todoApi from '../api/todoApp';
import { actSetSelectedTodo, getListTodoError, getListTodoSuccess } from './action/todo';
import { ACTION_TYPE } from './constants';

// ACTION: get list todo
function* getListTodoSaga() {
  try {
    const data = yield call(todoApi.getListTodoApp);
    yield put(getListTodoSuccess(data));
  } catch (error) {
    yield put(getListTodoError(error));
  }
}
function* watchGetListTodo() {
  yield takeEvery(ACTION_TYPE.GET_LIST_TODO, getListTodoSaga);
}

// ACTION: select todo
function* actSetSelectedTodoSaga(action) {
  yield put(actSetSelectedTodo(action.payload));
}

function* watchSelectedTodo() {
  yield takeEvery(ACTION_TYPE.GET_LIST_TODO, actSetSelectedTodoSaga);
}

// ACTION: create todo
function* actCreateTodoSaga(action) {
  yield call(todoApi.createTodoApp, action.payload);
  yield getListTodoSaga();
}
function* watchCreateTodo() {
  yield takeEvery(ACTION_TYPE.CREATE_TODO, actCreateTodoSaga);
}

// ACTION: update todo
function* actUpdateTodoSaga(action) {
  yield call(todoApi.updateTodoApp, action.payload);
  yield getListTodoSaga();
}
function* watchUpdateTodo() {
  yield takeEvery(ACTION_TYPE.UPDATE_TODO, actUpdateTodoSaga);
}

// ACTION: delete todo
function* actDeleteTodoSaga(action) {
  yield call(todoApi.deleteTodoApp, action.payload);
  yield getListTodoSaga();
}

function* watchDeleteTodo() {
  yield takeEvery(ACTION_TYPE.DELETE_TODO, actDeleteTodoSaga);
}

const todoAppSaga = [
  watchGetListTodo(),
  watchSelectedTodo(),
  watchCreateTodo(),
  watchUpdateTodo(),
  watchDeleteTodo(),
];

export default function* rootSaga() {
  yield all(todoAppSaga);
}
