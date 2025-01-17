import { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Task, Taskboard } from "../../../types/tasks/task";
import AddTask from "./AddTask";
import EditSvg from "../../assets/svgs/editSvg";
import DeleteSvg from "../../assets/svgs/deleteSvg";
import DateSvg from "../../assets/svgs/dateSvg";
import { LuHistory } from "react-icons/lu";
import ShowLogs from "../layouts/showLogs";
import ShowComments from "../layouts/showComments";
import {deleteTask} from "../../../actions/taskActions/delete.ts";

const   TaskTable = ({ heading, tasks, changed}: Taskboard) => {
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
    const [editTask, setEditTask] = useState<Task | null>(null);
    const [isShowLogsOpen, setIsShowLogsOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
    const [isShowCommentsOpen, setIsShowCommentsOpen] = useState(false);
    const [selectedTaskDetails, setSelectedTaskDetails] = useState<any | null>(null);
    const [addSubtaskOpen, setAddSubtaskOpen] = useState(false);
    const [parentTask, setParentTask] = useState<string | undefined>(undefined);

    const handleAddTaskClick = () => {
        setIsAddTaskOpen(true);
    };

    const handleEditTaskClick = (task: Task) => {
        setIsAddTaskOpen(true);
        setEditTask(task);
    };

    const handleAddSubtaskClick = (task: Task) => {
        setParentTask(task._id);
        setIsAddTaskOpen(true);
        setAddSubtaskOpen(true);
    };

    const handleDeleteTaskClick = (task: Task) => {
        deleteTask(task._id);
        changed();
    };

    const handleCloseAddTask = () => {
        setIsAddTaskOpen(false);
        setAddSubtaskOpen(false);
        setEditTask(null);
        changed();
    };

    const handleShowLogsClick = (logs: any) => {
        setSelectedTaskId(logs);
        setIsShowLogsOpen(true);
      };
    
      const handleCloseShowLogs = () => {
        setIsShowLogsOpen(false);
        setSelectedTaskId(null);
        changed();
      };
    
      const handleShowCommentsClick = (task: any) => {
        setSelectedTaskDetails(task);
        setIsShowCommentsOpen(true);
      };
    
      const handleCloseShowComments = () => {
        setIsShowCommentsOpen(false);
        setSelectedTaskDetails(null);
        changed();
      };

    function getPriorityColor(priority: string) {
        switch (priority) {
            case "low":
                return "bg-[#0ECC5A]";
            case "medium":
                return "bg-[#FFA235]";
            case "urgent":
                return "bg-[#FF6B6B]";
            default:
                return "";
        }
    }

    return (
        <div className="w-[365px] rounded-sm bg-white dark:bg-gray-800">
            <h2 className="text-2xl  items-center justify-between content-between font-semibold mb-4 flex text-gray-900 dark:text-gray-100">
                {heading}
                <p className="text-2xl">+</p>
            </h2>

            <Droppable key={heading} droppableId={heading}>
                {(provided) => (
                    <ul
                        className="rounded-xl h-[500px] overflow-y-scroll hide-scrollbar bg-white dark:bg-gray-800"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {tasks.map((task, index) => (
                            <Draggable key={task._id} draggableId={task._id} index={index}>
                                {(provided) => (
                                    <li
                                        className="bg-gray-100 dark:bg-gray-700 p-4 border rounded shadow-md mb-5 task-title"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <div className="flex content-between items-center justify-between">
                                            <h3 className="text-gray-700 dark:text-gray-200 text-lg font-semibold">
                                                {task.title}
                                            </h3>
                                            <div className="flex gap-2">
                                                
                                                <button onClick={() => handleAddSubtaskClick(task)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-500 w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                    </svg>
                                                </button>
                                                <button
                                                        className="text-blue-500"
                                                        onClick={() => handleShowLogsClick(task.logs)}
                                                    >
                                                    <LuHistory size={20} />
                                                </button>
                                                <button
                                                    className="text-blue-500" onClick={() => handleShowCommentsClick(task)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path  strokeLinecap="round"  strokeLinejoin="round"  strokeWidth={2}  d="M8 10h.01M12 10h.01M16 10h.01M21 16.5a2.5 2.5 0 01-2.5 2.5H6.5L3 21V5a2.5 2.5 0 012.5-2.5h15A2.5 2.5 0 0123 5v11.5z"/></svg>
                                                </button>
                                                <button onClick={() => handleEditTaskClick(task)}>
                                                    <EditSvg />
                                                </button>
                                                <button onClick={() => handleDeleteTaskClick(task)}>
                                                    <DeleteSvg />
                                                </button>
                                                
                                            </div>
                                        </div>
                                        {task.description && (
                                            <p className="text-gray-400 dark:text-gray-300 mt-2 text-balance task-description">
                                                {task.description}
                                            </p>
                                        )}
                                        <p
                                            className={`text-white w-fit p-1 rounded-lg text-sm px-2 mt-2 ${getPriorityColor(
                                                task.priority
                                            )}`}
                                        >
                                            {task.priority}
                                        </p>
                                        {task.deadline && (
                                            <p
                                                className={`text-gray-500 dark:text-gray-400 inline-flex gap-2 mt-2 ${
                                                    new Date(task.deadline) < new Date() ? "text-red-500" : ""
                                                }`}
                                            >
                                                <DateSvg />
                                                {task.deadline}
                                                {new Date(task.deadline) < new Date() && (
                                                    <span className="ml-2">(Deadline passed)</span>
                                                )}
                                            </p>
                                        )}
                                    </li>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>

            <button
                className="bg-gradient-to-b from-[#3A3A3A] to-[#202020] dark:from-[#1A1A1A] dark:to-[#101010] justify-center space-x-3 text-white p-3 rounded-lg flex items-center w-full mt-6"
                onClick={handleAddTaskClick}
            >
                <p>Add new task </p>
                <p className="text-2xl">+</p>
            </button>
            <AddTask
                title={heading}
                isOpen={isAddTaskOpen}
                onClose={handleCloseAddTask}
                editTask={editTask}
                subTask={addSubtaskOpen}
                parentTask = {parentTask}
            />
            {isShowLogsOpen && selectedTaskId && (
                <ShowLogs
                log={selectedTaskId}
                isOpen={isShowLogsOpen}
                onClose={handleCloseShowLogs}
                />
            )}
            {isShowCommentsOpen && selectedTaskDetails && (
                <ShowComments
                taskDetail={selectedTaskDetails}
                isOpen={isShowCommentsOpen}
                onClose={handleCloseShowComments}
                />
            )}
        </div>
    );
};

export default TaskTable;