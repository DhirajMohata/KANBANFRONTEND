import { useState, useEffect } from "react";
import TaskTable from "./TaskTable.tsx";
import { DragDropContext } from "react-beautiful-dnd";
import Filters from "../layouts/filter.tsx";
import { getTasksByProject } from "../../../actions/taskActions/get.ts";
import { updateTask } from "../../../actions/taskActions/update.ts";
import Analytics from "../layouts/analytics.tsx";

const Tasks = ( AddTask : boolean) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [analyticsData, setAnalyticsData] = useState<any[]>([]);
  const [analyticsModalOpen, setAnalyticsModalOpen] = useState(false);

  async function fetchTasks() {
    const productId = localStorage.getItem("projectId");
    console.log(productId);
    if (!productId) return;
    const response = await getTasksByProject(productId);
    console.log(response);
    if(!response ||  !Array.isArray(response)) return;
    setTasks(response);
  }

  function changed() {
    fetchTasks();
  }

  useEffect(() => {
    fetchTasks();
  } , [AddTask]);

  const toDoTasks = filteredTasks.filter((task) => task.status === "todo");
  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === "inprogress"
  );
  const underReviewTasks = filteredTasks.filter(
    (task) => task.status === "underreview"
  );
  const finishedTasks = filteredTasks.filter(
    (task) => task.status === "finished"
  );

  const updateTaskStatus = (taskId: string, newStatus: string) => {

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const onDragEnd = (result: any) => {
    const { destination, draggableId } = result;
    var status = destination.droppableId;
    status = status === "To Do" ? "todo" : status === "In Progress" ? "inprogress" : status === "Under Review" ? "underreview" : "finished";

    if(status === "finished") {
      const task = tasks.find((task) => task._id === draggableId);
      const subTaskId = task.subTasks;
      console.log(subTaskId);
      for(let i = 0; i < subTaskId.length; i++) {
        const subTask = tasks.find((task) => task._id === subTaskId[i]);
        if(subTask.status !== status) {
          return
        }
      }
    }

    updateTaskStatus(draggableId, status);
    updateTask({ taskId: draggableId, status: status });
  };

  const handleSearch = (search: string) => {
    setSearchTerm(search);
  };

  const handleFilter = (filter: string) => {
    setFilter(filter);
  };

  const handleUserFilter = (user: string) => {
    setUserFilter(user);
  }

  const handleAnalyticsClick = () => {
    const analyticTask = filteredTasks.map((task) => {
      return {
        priority: task.priority,
        status: task.status,
      };
    } );
    setAnalyticsData(analyticTask);
    setAnalyticsModalOpen(true);
  }

  useEffect(() => {
    let updatedTasks = tasks;
    if (searchTerm) {
      updatedTasks = updatedTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (task.description ?? "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    if (filter) {
      updatedTasks = updatedTasks.filter((task) => task.priority === filter);
    }

    if(userFilter) {
    
        updatedTasks = updatedTasks.filter((task) => task.assigned_to === userFilter);
    }

    setFilteredTasks(updatedTasks);
  }, [tasks, searchTerm, filter, userFilter]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <Filters handleFilter={handleFilter} handleSearch={handleSearch} handleUser={handleUserFilter} />
        <button
          onClick={handleAnalyticsClick}
          className="mb-6"
        >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 inline-block ml-2" viewBox="0 0 20 20" fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3a1 1 0 001 1h2a1 1 0 100-2h-1V7z"
            clipRule="evenodd"
          />
        </svg>
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-5 justify-evenly w-full bg-white dark:bg-gray-800 py-4 px-10 rounded-lg">
          <TaskTable heading="To Do" tasks={toDoTasks} changed = {changed} />
          <TaskTable heading="In Progress" tasks={inProgressTasks} changed = {changed}/>
          <TaskTable heading="Under Review" tasks={underReviewTasks} changed = {changed} />
          <TaskTable heading="Finished" tasks={finishedTasks} changed = {changed} />
        </div>
      </DragDropContext>
      {analyticsModalOpen ? (
        <Analytics
          isOpen={analyticsModalOpen}
          onClose={() => setAnalyticsModalOpen(false)}
          tasks={analyticsData}
        />
      ) : null}
    </div>
  );
};

export default Tasks;
