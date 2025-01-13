require('dotenv').config();

import axios from "axios";

import { createTaskType } from "../../types/actionTypes/task";

import { toast } from "react-hot-toast";

export const createTask = (task: createTaskType) => {
    const url = process.env.REACT_APP_API_URL + "tasks/create";
    return async () => {
        try {
            const response = await axios.post(url, task);
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
