export interface Task {
    _id: string;
    title: string;
    description?: string;
    project?: string;
    assigned_to?: string;
    assigned_by?: string;
    priority: string;
    status: string,
    deadline?: string;
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

export interface TaskState {
    tasks: Task[];
}

export interface Taskboard {
    heading: string;
    tasks: Task[];
  }
  