
import axios from "axios";
import { toast } from "react-hot-toast";
import { createTaskType } from "../../types/actionTypes/task";

export const createTask = async (task: createTaskType) => {
    const url = "http://192.168.24.47:3000/api/tasks/create";
        try {
            console.log(task);
            const response = await axios.post(url, task);
            return response.data;
        } catch (error) {
            console.log(error);
            toast.error("Task Creation Failed!!!");
        }
}
