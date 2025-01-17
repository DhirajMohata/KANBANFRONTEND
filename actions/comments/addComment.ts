
import axios from "axios";
import { toast } from "react-hot-toast";

export const addComment = async ({taskId, comment} : {taskId: string, comment: string}) => {
    const url = `http://192.168.24.47:3000/api/tasks/comment`;
    try {
        const response = await axios.post(url, { taskId, comment });
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error("Comment Creation Failed!!!");
    }
}