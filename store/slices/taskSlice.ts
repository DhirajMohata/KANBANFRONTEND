import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Task } from '../../types/tasks/task';
import { TaskForAddTask } from '../../types/tasks/addTask';
import { initialState } from '../initialStates/taskState';


const priorityOrder: Record<string, number> = {
    Low: 1,
    Medium: 2,
    Urgent: 3,
};

const getUniqueID = () => {
    return Math.random().toString(36).substr(2, 9);
}
const taskSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<TaskForAddTask>) => {
            action.payload._id = getUniqueID();
            state.tasks = [...state.tasks, action.payload];
        },
        updateTask: (state, action: PayloadAction<{ taskId: string; status: string }>) => {
            state.tasks = state.tasks.map((task) =>
                task._id === action.payload.taskId ? { ...task, status: action.payload.status } : task
            );
        },
        updateTaskContent: (state, action: PayloadAction<Task>) => {
            console.log(action.payload);
            state.tasks = state.tasks.map((task) =>
                task._id === action.payload._id ? action.payload : task
            );
            console.log(state.tasks);
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter((task) => task._id !== action.payload);
        },
        filterTaksCustom: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter((task) => task.priority === action.payload);
        },
        sortTasksCustom: (state) => {
            state.tasks = state.tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        },
        deleteAllTasks: (state) => {
            state.tasks = [];
        },
    },
  });
  
  export const { addTask, updateTask, updateTaskContent, deleteTask, sortTasksCustom, filterTaksCustom, deleteAllTasks} = taskSlice.actions;

  export default taskSlice.reducer;