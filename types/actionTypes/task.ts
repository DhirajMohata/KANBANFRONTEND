export interface createTaskType {
    title : string;
    description?: string;
    project : string;
    priority : string;
    status : string;
    assigned_to : string;
    assigned_by : string;
    attatchment? : string;
    parentTaskId? : string;
}
