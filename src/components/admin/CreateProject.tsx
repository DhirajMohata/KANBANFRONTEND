import React, { useState } from "react";
import { toast } from "react-hot-toast";
import CloseSvg from "../../assets/svgs/closeSvg";
import Select from "react-select";



const CreateProject: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [manager, setManager] = useState("");
  const [team, setTeam] = useState<string[]>([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
    console.log({ name, description, manager, team });
    toast.success("Project Created Successfully", {
      className: "bg-green-600 text-xl text-white font-semibold px-4 py-3 rounded-lg",
      icon: "😊",
      duration: 5000,
    });
    onClose();
  };

  const teamOptions = [
        { value: "Member1", label: "Member 1" },
        { value: "Member2", label: "Member 2" },
        { value: "Member3", label: "Member 3" },
        { value: "Member4", label: "Member 4" },
    ];

    const handleTeamChange = (selectedOptions: any) => {
        const selectedTeam = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
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
            <label className="block text-xl text-gray-700 dark:text-gray-300 mb-2">Assign Manager</label>
            <select
              className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              value={manager}
              onChange={(e) => setManager(e.target.value)}
            >
              <option value="">Select Manager</option>
              {["Manager1", "Manager2", "Manager3"].map((manager) => (
                <option key={manager} value={manager}>
                  {manager.replace("Manager", "Manager ")}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-5">
            <label className="block text-xl text-gray-700 dark:text-gray-300 mb-2">Select Team Members</label>
            <Select
                isMulti
                options={teamOptions}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                value={teamOptions.filter(option => team.includes(option.value))}
                onChange={handleTeamChange}
                placeholder="Select Team Members"
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary25: 'rgba(59, 130, 246, 0.5)', 
                    primary: 'rgba(59, 130, 246, 1)',
                    neutral0: 'rgba(31, 41, 55, 1)', 
                    neutral80: 'rgba(229, 231, 235, 1)',
                    neutral90: 'rgba(255, 255, 255, 1)', // Light mode background
                    neutral10: 'rgba(55, 65, 81, 1)', // Dark mode background
                  },
                })}
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Selected Team Members</label>
            <div className="flex flex-wrap gap-2">
              {team.map((member) => (
                <span key={member} className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded shadow">
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