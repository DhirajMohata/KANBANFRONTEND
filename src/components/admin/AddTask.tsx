import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import StatusSvg from "../../assets/svgs/statusSvg";
import WriteSvg from "../../assets/svgs/writeSvg";
import CloseSvg from "../../assets/svgs/closeSvg";
import DeadlineSvg from "../../assets/svgs/deadlineSvg";
import PrioritySvg from "../../assets/svgs/prioritySvg";

import { createTask } from "../../../actions/taskActions/add";

interface AddTaskProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    editTask?: any;
    subTask?: boolean;
}

const AddTask: React.FC<AddTaskProps> = ({ title, isOpen, onClose, editTask, subTask }) => {
    const [status, setStatus] = React.useState(title);
    const [main, setMain] = useState("");
    const [description, setDescription] = useState<string | undefined>("");
    const [priority, setPriority] = useState("low");
    const [date, setDate] = useState("");
    const [assignedTo, setAssignedTo] = useState("");
    const [parentTasks, setParentTasks] = useState<string[]>([]);
    const [parentTask, setParentTask] = useState("");
    const [assignedToList, setAssignedToList] = useState<string[]>([]);
    const assigned_by = localStorage.getItem("email");
    const project = localStorage.getItem("projectId");

    useEffect(() => {
        if (editTask != null) {
            setMain(editTask.title);
            setDescription(editTask.description);
            setPriority(editTask.priority);
            setDate(editTask.date);
            setAssignedTo(editTask.assignedTo);
            setParentTask(editTask.parentTask);
        }
    }, [editTask]);

    useEffect(() => {
        const teamMemberTemp = localStorage.getItem("teamMembers");
        if(!teamMemberTemp) return;
        const teamMembers = teamMemberTemp.split(",");
        setAssignedToList(teamMembers);
    }
    , []);
    

    const add = async () => {
        try {
            if (editTask != null) {
                // Simulate task update
                toast.success("Successfully Edited", {
                    className: "bg-green-600 text-xl text-white font-semibold px-4 py-3 rounded-lg",
                    icon: "😊",
                    duration: 5000,
                });
            } else {
                // Simulate task addition
                const response = await createTask({
                    title: main,
                    status: status,
                    project: project,
                    description: description,
                    priority: priority,
                    deadline: date.toString(),
                    assigned_to: assignedTo,
                    assigned_by: assigned_by,
                    parentTaskId: parentTask,
                });
                console.log(date)
                console.log(assignedTo)
                console.log(response)
                toast.success("Successfully Added", {
                    className: "bg-green-600 text-xl text-white font-semibold px-4 py-3 rounded-lg",
                    icon: "😊",
                    duration: 5000,
                });
            }
            onClose();
        } catch (error) {
            console.error("Adding task failed:", error);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        add();
    };

    return (
        <div
            className={`fixed inset-0 bg-gray-100 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-80 z-50 flex items-center justify-center transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
            <div className="p-9 pr-11 fixed top-0 right-0 h-full w-full max-w-3xl bg-white dark:bg-gray-800 shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out">
                <div className="flex justify-end items-center mb-5 border-gray-400 dark:border-gray-600">
                    <button
                        className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                        onClick={onClose}
                    >
                        <CloseSvg />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="pl-5">
                    <input
                        type="text"
                        placeholder="Title"
                        className="w-full px-4 py-3 mb-3 font-semibold rounded text-4xl border-hidden focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-white"
                        required
                        value={main}
                        onChange={(e) => setMain(e.target.value)}
                    />
                    <table className="table-auto w-full">
                        <tbody>
                            <tr>
                                <td className="py-2 pr-4"></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className="py-2 pr-4 inline-flex gap-2 mb-5">
                                    <StatusSvg />
                                    <label className="block text-gray-700 dark:text-gray-300">Status</label>
                                </td>
                                <td className="mb-5">
                                    <select
                                        className="w-full p-2 border-none rounded focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-white"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value.toString())}
                                    >
                                        <option value="todo">To Do</option>
                                        <option value="inprogress">In Progress</option>
                                        <option value="underreview">Under Review</option>
                                        <option value="finished">Finished</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 pr-4 inline-flex gap-2 mb-5">
                                    <WriteSvg />
                                    <label className="block text-gray-700 dark:text-gray-300">Description</label>
                                </td>
                                <td className="mb-5">
                                    <input
                                        type="text"
                                        className="w-full p-2 rounded focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-white"
                                        placeholder="Add Description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 pr-4 inline-flex gap-2 mb-5">
                                    <DeadlineSvg />
                                    <label className="block text-gray-700 dark:text-gray-300">Deadline</label>
                                </td>
                                <td className="mb-5">
                                    <input
                                        type="date"
                                        className="w-full p-2 border-none rounded focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-white"
                                        placeholder="Deadline"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 pr-4 inline-flex gap-2 mb-5">
                                    <PrioritySvg />
                                    <label className="block text-gray-700 dark:text-gray-300">Priority</label>
                                </td>
                                <td className="mb-5">
                                    <select
                                        className="w-full p-2 border-none rounded focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-white"
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value)}
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="urgent">Urgent</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 pr-4 inline-flex gap-2 mb-5">
                                    <label className="block text-gray-700 dark:text-gray-300">Assigned To</label>
                                </td>
                                <td className="mb-5">
                                    <select
                                        className="w-full p-2 border-none rounded focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-white"
                                        value={assignedTo}
                                        onChange={(e) => setAssignedTo(e.target.value)}
                                    >
                                        <option value="" disabled>
                                            Select a team member
                                        </option>
                                        {assignedToList.map((name) => (
                                            <option key={name} value={name}>
                                                {name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            {subTask && (
                                <tr>
                                    <td className="py-2 pr-4 inline-flex gap-2 mb-5">
                                        <label className="block text-gray-700 dark:text-gray-300">Parent Task</label>
                                        </td>
                                        <td className="mb-5">
                                            <select
                                                className="w-full p-2 border-none rounded focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-white"
                                                value={assignedTo}
                                                onChange={(e) => setParentTask(e.target.value)}
                                            >
                                                {parentTasks.map((task) => (
                                                    <option key={task} value={task}>
                                                        {task}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                    <div className="flex mt-4">
                        <button
                            type="submit"
                            className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 text-lg rounded"
                        >
                            {editTask ? "Edit Task" : subTask? "Add Sub Task" : "Add Task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTask;