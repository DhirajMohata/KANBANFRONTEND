require('dotenv').config();

import axios from "axios";

import { createTaskType } from "../../types/actionTypes/task";

import { toast } from "react-hot-toast";

export const updateTask = ({ taskId, status }) => {
    const url = process.env.REACT_APP_API_URL + "tasks/update";
    return async () => {
        try {
            const response = await axios.put(url, { taskId, status });
            if(response.status !== 200) {
                toast.success("Task Created!!!");
            } else {
                toast.error("Task Creation Failed!!!");
            }
            return;
        } catch (error) {
            toast.error(error.response.data);
        }
    };
}

export const editTask = (task: createTaskType) => {
    const url = process.env.REACT_APP_API_URL + "tasks/edit";
    return async () => {
        try {
            const response = await axios.put(url, task);
            if(response.status !== 200) {
                toast.success("Task Created!!!");
            } else {
                toast.error("Task Creation Failed!!!");
            }
            return;
        } catch (error) {
            toast.error(error.response.data);
        }
    };
}
