
import axios from "axios";

import { toast } from "react-hot-toast";

export const deleteTask = async (taskId: string) => {
    const url = "http://192.168.24.47:3000/api/tasks/delete";
        try {
            const response = await axios.put(url, { taskId });
            if(response.status === 200) {
                toast.success("Task Deleted!!!");
            } else {
                toast.error("Task Deletion Failed!!!");
            }
            return;
        } catch (error) {
            console.log("Error deleting task: ", error);    
            toast.error("Task Deletion Failed!!!");
        }
}