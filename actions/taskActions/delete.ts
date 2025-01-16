
import axios from "axios";

import { toast } from "react-hot-toast";

export const deleteTask = ({ taskId }) => {
    const url = "http://localhost:3000/api/tasks/delete";
    return async () => {
        try {
            const response = await axios.put(url, { taskId });
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