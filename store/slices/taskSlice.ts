import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../types/tasks/task';
import { initialState } from '../initialStates/taskState';


const getUniqueID = () => {
    return Math.random().toString(36).substr(2, 9);
}

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            action.payload._id = getUniqueID();
            state.tasks = [...state.tasks, action.payload];
        },
        updateTask: (state, action: PayloadAction<{ taskId: string; status: 'To Do' | 'In Progress' | 'Under Review' | 'Finished' }>) => {
            state.tasks = state.tasks.map((task) =>
                task._id === action.payload.taskId ? { ...task, status: action.payload.status } : task
            );
        },
        addComment: (state, action: PayloadAction<{ taskId: string; comment: { user: string; comment: string } }>) => {
            state.tasks = state.tasks.map((task) =>
                task._id === action.payload.taskId
                    ? { ...task, comments: [...(task.comments || []), { ...action.payload.comment, created_at: new Date().toISOString() }] }
                    : task
            );
        },
        addLog: (state, action: PayloadAction<{ taskId: string; log: { action: string; user: string } }>) => {
            state.tasks = state.tasks.map((task) =>
                task._id === action.payload.taskId
                    ? { ...task, logs: [...(task.logs || []), { ...action.payload.log, created_at: new Date().toISOString() }] }
                    : task
            );
        },
        addSubTask: (state, action: PayloadAction<{ taskId: string; subTaskId: string }>) => {
            state.tasks = state.tasks.map((task) =>
                task._id === action.payload.taskId
                    ? { ...task, subTasks: [...(task.subTasks || []), action.payload.subTaskId] }
                    : task
            );
        },
    },
});

export const { addTask, updateTask, addComment, addLog, addSubTask } = taskSlice.actions;
export default taskSlice.reducer;