// src/components/CreateGroup.jsx
import { useState } from "react";
import { createGroup } from "../services/groupsAPI";
import { useNavigate } from "react-router-dom";

export default function CreateGroup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createGroup(formData);
      navigate("/groups");
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-indigo-400 mb-8">Create New Group</h1>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-xl shadow-xl shadow-gray-950/30">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Group Name</label>
              <input
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                placeholder="Enter group name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                rows="4"
                placeholder="Group description..."
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="px-6 py-2.5 text-gray-400 hover:text-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}