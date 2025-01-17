
import axios from "axios";

import { toast } from "react-hot-toast";

export const updateTask = async ({ taskId, status }: { taskId: string; status: string }) => {
    const url = "http://192.168.24.47:3000/api/tasks/update";
        try {
            const response = await axios.put(url, { taskId, status });
            return response.data;
        } catch (error) {
            console.log(error);
            toast.error("Task Update Failed!!!");
        }
}

export const editTasks = async (task: any) => {
    const url = "http://192.168.24.47:3000/api/tasks/edit";
        try {
            console.log(task);
            const response = await axios.put(url, task);

            return response.data;
        } catch (error) {
            console.log(error);
            toast.error("Task Edition Failed!!!");
        }
}
