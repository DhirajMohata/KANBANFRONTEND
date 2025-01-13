export interface Task {
    _id: string;
    title: string;
    description?: string;
    priority: string;
    date: string;
    status: string;
}

export interface TaskState {
    tasks: Task[];
}

export interface Taskboard {
    heading: string;
    tasks: Task[];
  }
  