import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/authContext';
import { useLocation } from 'react-router-dom';

const ProjectList = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isAdmin = location.pathname.includes('/admin-dashboard');
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const url = isAdmin
        ? 'http://localhost:5000/api/projects/all'
        : `http://localhost:5000/api/projects/employee/${user._id}`;

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      const projectData = isAdmin ? res.data.projects : res.data;
      setProjects(projectData);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const markAsCompleted = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/projects/complete/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchProjects();
    } catch (error) {
      alert(error.response?.data?.message || 'Could not mark as complete');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [location.pathname]);

  return (
    <div className="p-6 bg-gradient-to-b from-white to-cyan-50 min-h-screen">
      <h2 className="text-3xl font-extrabold text-cyan-800 mb-6 text-center">
        {isAdmin ? 'All Projects' : 'My Projects'}
      </h2>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="w-full text-sm text-gray-700 border-collapse rounded-lg">
          <thead className="bg-cyan-700 text-white">
            <tr>
              <th className="px-6 py-3">S.No</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Deadline</th>
              <th className="px-6 py-3">Assigned To</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-400">
                  No projects found.
                </td>
              </tr>
            ) : (
              projects.map((proj, index) => (
                <tr key={proj._id} className="hover:bg-cyan-50 transition-all">
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{proj.title}</td>
                  <td className="px-6 py-3">{proj.description}</td>
                  <td className="px-6 py-3">{new Date(proj.deadline).toLocaleDateString()}</td>
                  <td className="px-6 py-3">
                    {proj.assignedTo?.userId?.name || proj.assignedTo?.name || 'N/A'}
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        proj.status === 'Completed'
                          ? 'bg-green-600 text-white'
                          : 'bg-yellow-300 text-gray-800'
                      }`}
                    >
                      {proj.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    {proj.status === 'Pending' && !isAdmin && (
                      <button
                        onClick={() => markAsCompleted(proj._id)}
                        className="bg-cyan-600 hover:bg-cyan-800 transition text-white px-4 py-1.5 rounded-md text-sm"
                      >
                        Mark Completed
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectList;
