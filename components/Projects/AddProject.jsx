import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProject = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    assignedTo: '',
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/employees', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (res.data.success) {
            setEmployees(res.data.employees || []);
            } else {
            setEmployees([]);
            }
      } catch (error) {
        console.error('Failed to fetch employees:', error);
        alert('Failed to load employees');
      }
    };
    fetchEmployees();
  }, []);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/projects/add', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      navigate('/admin-dashboard/projects');
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project');
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-gradient-to-br from-cyan-50 to-white p-10 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-cyan-900 mb-8 text-center">Add New Project</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Project Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
              required
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
              required
            />
          </div>

         
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
              required
            ></textarea>
          </div>

         
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Assign To</label>
            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
              required
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.userId?.name || emp.name} ({emp.employeeId})
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-800 hover:bg-cyan-900 text-white font-bold py-3 px-4 rounded-xl shadow-md transition"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default AddProject;
