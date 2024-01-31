import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { INIT_TODO } from 'src/constants/consts';
import { ITodoState } from 'src/common/inteface';

interface ITodoAppState {
  listTodoApp: ITodoState[];
  selectedTodo: ITodoState | null;
}

const initialState: ITodoAppState = {
  listTodoApp: INIT_TODO,
  selectedTodo: null,
};

export const todoAppSlice = createSlice({
  name: 'TodoApp',
  initialState,
  reducers: {
    actAddTodo: (state: ITodoAppState, action: PayloadAction<ITodoState>) => {
      state.listTodoApp.push(action.payload);
    },
    actSetSelectedTodo: (state: ITodoAppState, action: PayloadAction<ITodoState | null>) => {
      state.selectedTodo = action.payload;
    },
    actEditTodo: (state: ITodoAppState, action: PayloadAction<ITodoState>) => {
      const { id, ...updateData } = action.payload;

      const index = state.listTodoApp.findIndex((item: ITodoState) => item.id === id);
      state.listTodoApp[index] = { ...state.listTodoApp[index], ...updateData };
    },
    actDeleteTodo: (state: any, action: PayloadAction<string>) => {
      const index = state.listTodoApp.findIndex((item: ITodoState) => item.id === action.payload);
      if (index !== -1) {
        state.listTodoApp.splice(index, 1);
      }
    },
  },
});

export const { actSetSelectedTodo, actAddTodo, actEditTodo, actDeleteTodo } = todoAppSlice.actions;

export const todoAppSelector = (state: RootState) => state.TodoApp;
export default todoAppSlice.reducer;
