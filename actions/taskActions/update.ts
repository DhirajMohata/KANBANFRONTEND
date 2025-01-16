
import axios from "axios";

import { createTaskType } from "../../types/actionTypes/task";

import { toast } from "react-hot-toast";

export const updateTask = async ({ taskId, status }: { taskId: string; status: string }) => {
    const url = "http://localhost:3000/api/tasks/update";
        try {
            const response = await axios.put(url, { taskId, status });
            return response.data;
        } catch (error) {
            console.log(error);
        }
}

export const editTask = async (task: createTaskType) => {
    const url = "http://localhost:3000/api/tasks/edit";
        try {
            const response = await axios.put(url, task);
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
