import React, { useState, useEffect } from "react";
import TaskTable from "./taskTable.tsx";
import { DragDropContext } from "react-beautiful-dnd";
import Filters from "../layouts/filter.tsx";

const initialTasks = [
  {
    id: "1",
    _id: "1",
    title: "Task 1",
    description: "Description 1",
    status: "To Do",
    priority: "Urgent",
    date: new Date().toISOString(),
    assigned_to: "user1"
  },
  {
    id: "2",
    _id: "2",
    title: "Task 2",
    description: "Description 2",
    status: "In Progress",
    priority: "Medium",
    date: new Date().toISOString(),
    assigned_to: "user3"
  },
  {
    id: "3",
    _id: "3",
    title: "Task 3",
    description: "Description 3",
    status: "Under Review",
    priority: "Low",
    date: new Date().toISOString(),
    assigned_to: "user1"
  },
  {
    id: "4",
    _id: "4",
    title: "Task 4",
    description: "Description 4",
    status: "Finished",
    priority: "Urgent",
    date: new Date().toISOString(),
    assigned_to: "user2"
  },
];

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  const toDoTasks = filteredTasks.filter((task) => task.status === "To Do");
  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === "In Progress"
  );
  const underReviewTasks = filteredTasks.filter(
    (task) => task.status === "Under Review"
  );
  const finishedTasks = filteredTasks.filter(
    (task) => task.status === "Finished"
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
