import React, { useEffect, useState } from 'react';
import { fetchDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  const [employee, setEmployee] = useState(null);
  const [departments, setDepartments] = useState([]); 
  const [formData, setFormData] = useState({
    name: "",
    maritalStatus: "",
    designation: "",
    salary: "",
    department: "",
    image: null
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const loadDepartments = async () => {
      const data = await fetchDepartments();
      if (data) setDepartments(data);
    };
    loadDepartments();
  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employees/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data.success) {
          const emp = response.data.employee;
          setEmployee(emp);
          setFormData({
            name: emp?.userId?.name || "",
            maritalStatus: emp?.maritalStatus || "",
            designation: emp?.designation || "",
            salary: emp?.salary || "",
            department: emp?.department?._id || "",
            image: null
          });
        }
      } catch (error) {
        alert(error.response?.data?.error || "Error fetching employee");
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formDataObj.append(key, value); 
    });

    try {
      const response = await axios.put(`http://localhost:5000/api/employees/edit/${id}`, formDataObj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      alert(error.response?.data?.error || "Failed to update employee");
    }
  };

  return (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-6'>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Marital Status</label>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Designation</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Salary</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
        </div>

        <div className='mt-4'>
          <label className='block text-sm font-medium text-gray-700'>Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          >
            <option value="">Select Department</option>
            {departments.map((dep) => (
              <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
            ))}
          </select>
        </div>

        <div className='mt-4'>
          <label className='block text-sm font-medium text-gray-700'>Change Profile Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-cyan-800 hover:bg-cyan-900 text-white font-bold py-2 px-4 rounded-md"
        >
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default Edit;
