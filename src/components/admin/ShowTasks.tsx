import React, { useState, useEffect } from "react";
import TaskTable from "./TaskTable.tsx";
import { DragDropContext } from "react-beautiful-dnd";
import Filters from "../layouts/filter.tsx";
import { getTasksByProject } from "../../../actions/taskActions/get.ts";
import { updateTask } from "../../../actions/taskActions/update.ts";

const Tasks = ( AddTask : boolean) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [filteredTasks, setFilteredTasks] = useState(tasks);


  async function fetchTasks() {
    const productId = localStorage.getItem("projectId");

    if (!productId) return;
    const response = await getTasksByProject(productId);

    if(!response ||  !Array.isArray(response)) return;
    setTasks(response);
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
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
 
    if (!destination) {
      return;
    }

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    updateTaskStatus(draggableId, destination.droppableId);
    var status = destination.droppableId;
    status = status === "To Do" ? "todo" : status === "In Progress" ? "inprogress" : status === "Under Review" ? "underreview" : "finished";

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
      <Filters handleFilter={handleFilter} handleSearch={handleSearch} handleUser={handleUserFilter} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-5 justify-evenly w-full bg-white dark:bg-gray-800 py-4 px-10 rounded-lg">
          <TaskTable heading="To Do" tasks={toDoTasks} />
          <TaskTable heading="In Progress" tasks={inProgressTasks} />
          <TaskTable heading="Under Review" tasks={underReviewTasks} />
          <TaskTable heading="Finished" tasks={finishedTasks} />
        </div>
      </DragDropContext>
    </div>
  );
};

export default Tasks;
