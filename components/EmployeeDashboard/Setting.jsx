import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import axios from 'axios';

const Setting = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (setting.newPassword !== setting.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.put(
        'http://localhost:5000/api/setting/change-password',
        setting,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        setSuccess('Password changed successfully');
        setTimeout(() => navigate('/employee-dashboard'), 1500);
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Change Password</h2>

      {error && <p className="text-red-600 mb-4 font-medium">{error}</p>}
      {success && <p className="text-green-600 mb-4 font-medium">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Old Password
          </label>
          <input
            type="password"
            name="oldPassword"
            placeholder="Enter current password"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            placeholder="Enter new password"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm new password"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-600"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-cyan-800 hover:bg-cyan-900 text-white font-semibold py-2.5 rounded-xl transition duration-200"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default Setting;
