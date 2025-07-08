import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddLeave = () => {
    const {user} = useAuth()
  const [formData, setFormData] = useState({
    userId: user._id,
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    const {name, value} = e.target 
    setFormData((prevState) => ({...prevState, [name] : value}))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`http://localhost:5000/api/leave/add`,formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data.success) {
          navigate(`/employee-dashboard/leave/${user._id}`)
        }
      } catch (error) {
        alert(error.response?.data?.error || "Error fetching employee");
      }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Request for Leave</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-6">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Leave Type
            </label>
            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
              required
            >
              <option value="" disabled>Select leave type</option>
              <option value="Casual">Casual Leave</option>
              <option value="Sick">Sick Leave</option>
              <option value="Earned">Earned Leave</option>
              <option value="Maternity">Maternity Leave</option>
              <option value="Paternity">Paternity Leave</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows={4}
              placeholder="Reason for leave..."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600 resize-none"
              required
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-8 bg-cyan-800 hover:bg-cyan-900 text-white font-bold py-3 px-4 rounded-xl transition duration-200"
        >
          Submit Leave Request
        </button>
      </form>
    </div>
  );
};

export default AddLeave;
