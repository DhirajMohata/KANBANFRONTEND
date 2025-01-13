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
    project?: string;
    assigned_to?: string;
    assigned_by?: string;
    priority: string;
    status: string,
    logs?: {
        action: string;
        user?: string;
        created_at: string;
    }[] ;
    attachment?: string;
    createdAt: string;
    comments?: {
        user?: string;
        comment: string;
        created_at: string;
    }[] ;
    subTasks?: string[];
}