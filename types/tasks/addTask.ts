import { Task } from "./task";
export interface AddTaskProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    editTask: Task | null;
}

export interface TaskForAddTask {
    _id: string;
    title: string;
    description?: string;
    priority: string;
    date: string;
    status: string;
}