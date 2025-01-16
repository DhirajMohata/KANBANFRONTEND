
import axios from "axios";

import { createTaskType } from "../../types/actionTypes/task";

import { toast } from "react-hot-toast";

export const createTask = async (task: createTaskType) => {
    const url = "http://localhost:3000/api/tasks/create";
        try {
            console.log(task);
            const response = await axios.post(url, task);
            if(response.status !== 200) {
                toast.success("Task Created!!!");
            } else {
                toast.error("Task Creation Failed!!!");
            }
            return;
        } catch (error) {
            console.log(error);
        }
}
