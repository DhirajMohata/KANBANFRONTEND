export interface createTaskType {
    taskId? : string;
    title : string;
    description?: string;
    project : any;
    priority : string;
    status : string;
    deadline : string;
    assigned_to : string;
    assigned_by : any;
    attatchment? : string;
    parentTaskId? : string;
}
