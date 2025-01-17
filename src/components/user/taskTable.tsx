import { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Taskboard } from "../../../types/tasks/task";
import DateSvg from "../../assets/svgs/dateSvg";
import { LuHistory } from "react-icons/lu";
import ShowLogs from "../layouts/showLogs";
import ShowComments from "../layouts/showComments";

const TaskTable = ({ heading, tasks }: Taskboard) => {
  const [isShowLogsOpen, setIsShowLogsOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isShowCommentsOpen, setIsShowCommentsOpen] = useState(false);
  const [selectedTaskDetails, setSelectedTaskDetails] = useState<any | null>(
    null
  );

  const handleShowLogsClick = (logs: any) => {
    setSelectedTaskId(logs);
    setIsShowLogsOpen(true);
  };

  const handleCloseShowLogs = () => {
    setIsShowLogsOpen(false);
    setSelectedTaskId(null);
  };

  const handleShowCommentsClick = (task: any) => {
    setSelectedTaskDetails(task);
    setIsShowCommentsOpen(true);
  };

  const handleCloseShowComments = () => {
    setIsShowCommentsOpen(false);
    setSelectedTaskDetails(null);
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
            className="rounded-xl h-[580px] overflow-y-scroll hide-scrollbar bg-white dark:bg-gray-800"
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
                        <button
                          className="text-blue-500"
                          onClick={() => handleShowLogsClick(task.logs)}
                        >
                          <LuHistory size={20} />
                        </button>
                        <button
                          className="text-blue-500"
                          onClick={() => handleShowCommentsClick(task)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 16.5a2.5 2.5 0 01-2.5 2.5H6.5L3 21V5a2.5 2.5 0 012.5-2.5h15A2.5 2.5 0 0123 5v11.5z"/>
                          </svg>
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

      {isShowLogsOpen && (
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
