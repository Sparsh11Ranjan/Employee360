import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employees/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        alert(error.response?.data?.error || "Error fetching employee");
      }
    };

    fetchEmployee();
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white p-6">
      {employee ? (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-3xl font-extrabold text-cyan-800 mb-8 text-center">Employee Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="flex justify-center items-start">
              <img
                src={`http://localhost:5000/uploads/${employee?.userId?.profileImage}`}
                alt="Profile"
                onError={(e) => (e.target.src = "/default-profile.jpg")}
                className="w-72 h-72 rounded-full object-cover border-4 border-cyan-600 shadow-md"
              />
            </div>

            <div className="space-y-4 text-gray-700">
              <ProfileItem label="Name" value={employee?.userId?.name} />
              <ProfileItem label="Employee ID" value={employee?.employeeId} />
              <ProfileItem label="Date of Birth" value={new Date(employee?.dob).toLocaleDateString()} />
              <ProfileItem label="Gender" value={employee?.gender} />
              <ProfileItem label="Department" value={employee?.department?.dep_name} />
              <ProfileItem label="Designation" value={employee?.designation} />
              <ProfileItem label="Marital Status" value={employee?.maritalStatus} />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-20 text-lg font-medium">Loading employee data...</div>
      )}
    </div>
  );
};

const ProfileItem = ({ label, value }) => (
  <div className="flex items-center">
    <p className="w-40 text-cyan-800 font-semibold">{label}:</p>
    <p className="flex-1 font-medium">{value}</p>
  </div>
);

export default View;
