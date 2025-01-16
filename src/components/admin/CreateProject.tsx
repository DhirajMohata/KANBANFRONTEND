import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import CloseSvg from "../../assets/svgs/closeSvg";
import Select from "react-select";
import { createProject, getManagers, getUsers } from "../../../actions/projectActions/project";

type TeamOption = {
  value: string;
  label: string;
};

const CreateProject: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [manager, setManager] = useState("");
  const [team, setTeam] = useState<string[]>([]);
  const [teamOptions, setTeamOptions] = useState<TeamOption[]>([]);
  const [managers, setManagers] = useState<TeamOption[]>([]);
  const [teamIds, setTeamIds] = useState<string[]>([]);
  
  const admin = localStorage.getItem("email");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
    try {
      createProject({
        name,
        description,
        manager,
        teamMembers: teamIds,
        admin,
      });
      toast.success("Project Created Successfully", {
        className:
          "bg-green-600 text-xl text-white font-semibold px-4 py-3 rounded-lg",
        icon: "😊",
        duration: 5000,
      });
    } catch (error) {
      console.log(error);
      toast.error("Project Creation Failed!!!");
    }

    onClose();
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        console.log(users);
        if (!users || !Array.isArray(users)) return;
        setTeamOptions(users.map((user: any) => ({ value: user.value, label: user.title })));
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    const fetchManagers = async () => {
      try {
        const managers = await getManagers();
        if (!managers || !Array.isArray(managers)) 
          {
            console.log(managers);
            return;
          }
        setManagers(managers.map((manager: any) => ({ value: manager.value, label: manager.title })));
      } catch (error) {
        console.error("Failed to fetch managers", error);
      }
    }
    fetchUsers();
    fetchManagers();
  } , []);

  const handleTeamChange = (selectedOptions: any) => {
    const selectedTeam = selectedOptions
      ? selectedOptions.map((option: any) => option.label)
      : [];
    const selectTeamIds = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    setTeamIds(selectTeamIds);
    setTeam(selectedTeam);
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
            placeholder="Project Name"
            className="w-full px-4 py-3 mb-3 font-semibold rounded-lg text-4xl border-hidden focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-white"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="w-full px-4 py-3 mb-3 rounded-lg font-semibold text-lg border-hidden focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-white"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="mb-5">
            <label className="block text-xl text-gray-700 dark:text-gray-300 mb-2">
              Assign Manager
            </label>
            <select
              className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              value={manager}
              onChange={(e) => setManager(e.target.value)}
            >
                <option value="">Select Manager</option>
                {managers.map((manager) => (
                <option key={manager.value} value={manager.value}>
                  {manager.label}
                </option>
                ))}
            </select>
          </div>
          <div className="mb-5">
            <label className="block text-xl text-gray-700 dark:text-gray-300 mb-2">
              Select Team Members
            </label>
            <Select
              isMulti
              options={teamOptions}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              value={teamOptions.filter(option => team.includes(option.label))}
              onChange={handleTeamChange}
              placeholder="Select Team Members"
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: "rgba(59, 130, 246, 0.5)",
                  primary: "rgba(59, 130, 246, 1)",
                  neutral0: "rgba(31, 41, 55, 1)",
                  neutral80: "rgba(229, 231, 235, 1)",
                  neutral90: "rgba(255, 255, 255, 1)", // Light mode background
                  neutral10: "rgba(55, 65, 81, 1)", // Dark mode background
                },
              })}
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Selected Team Members
            </label>
            <div className="flex flex-wrap gap-2">
              {team.map((member) => (
                <span
                  key={member}
                  className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded shadow"
                >
                  {member}
                </span>
              ))}
            </div>
          </div>
          <div className="flex mt-4">
            <button
              type="submit"
              className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 text-lg rounded"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
