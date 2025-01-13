import { TaskState } from "../../types/tasks/task";

export const initialState: TaskState = {
    tasks: [
        {
            _id: '1',
            title: 'Have to run',
            description: 'I will be running in the morning for 10 to 20 min to keep myself fit',
            priority: 'Low',
            date: '2021-09-01',
            status: 'To Do',
        },
        {
            _id: '2',
            title: 'Do Daily Task',
            description: 'Will make a list of tasks to be done today',
            priority: 'Medium',
            date: '2025-09-02',
            status: 'In Progress',
        },
        {
            _id: '3',
            title: 'Eat Healthy',
            description: 'Will eat healthy food to keep myself fit',
            priority: 'Urgent',
            date: '2021-00-03',
            status: 'Under Review',
        },
        {
            _id: '4',
            title: 'Do workout',
            description: 'Have to do workout in the evening for 1 hour',
            priority: 'Low',
            date: '2025-09-04',
            status: 'Finished',
        },
        {
            _id: '5',
            title: 'Danish to be called',
            description: 'Call Danish to discuss about the project, And also discuss about the future plans',
            priority: 'Medium',
            date: '2025-09-05',
            status: 'To Do',
        },
        {
            _id: '6',
            title: 'Task 6',
            description: 'Description 6',
            priority: 'Urgent',
            date: '2021-09-06',
            status: 'To Do',
        },
    ]
};