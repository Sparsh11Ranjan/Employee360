import React, { useState, useEffect } from 'react';
import {
  FaUsers,
  FaBuilding,
  FaMoneyBillWave,
  FaFileAlt,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle
} from 'react-icons/fa';
import SummaryCard from './summaryCard';
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/dashboard/summary`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        setSummary(response.data);
      } catch (error) {
        const message = error.response?.data?.error || "Failed to load dashboard summary.";
        toast.error(message);
        console.error("Error fetching summary:", error.message);
      }
    };
    fetchSummary();
  }, []);

  if (!summary) {
    return <div className="text-center mt-10 text-gray-600">Loading summary...</div>;
  }

  return (
    <div className='p-6'>
      <h3 className='text-3xl font-semibold text-gray-800 mb-6'>Dashboard Overview</h3>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <SummaryCard
          icon={<FaUsers />}
          text="Total Employees"
          number={summary.totalEmployees}
          color="bg-cyan-800"
        />
        <SummaryCard
          icon={<FaBuilding />}
          text="Total Departments"
          number={summary.totalDepartments}
          color="bg-cyan-800"
        />
        <SummaryCard
          icon={<FaMoneyBillWave />}
          text="Monthly Salary"
          number={summary.totalSalary}
          color="bg-cyan-800"
        />
      </div>

      <div className="mt-12">
        <h4 className="text-2xl font-semibold text-gray-800 text-center">Leave Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SummaryCard
            icon={<FaFileAlt />}
            text="Leave Applied"
            number={summary.leaveSummary.appliedFor}
            color="bg-cyan-800"
          />
          <SummaryCard
            icon={<FaCheckCircle />}
            text="Leave Approved"
            number={summary.leaveSummary.approved}
            color="bg-cyan-800"
          />
          <SummaryCard
            icon={<FaHourglassHalf />}
            text="Leave Pending"
            number={summary.leaveSummary.pending}
            color="bg-cyan-800"
          />
          <SummaryCard
            icon={<FaTimesCircle />}
            text="Leave Rejected"
            number={summary.leaveSummary.rejected}
            color="bg-cyan-800"
          />
        </div>
      </div>

      <div className="mt-12">
        <h4 className="text-2xl font-semibold text-gray-800 text-center">Project Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SummaryCard
            icon={<FaCheckCircle />}
            text="Projects Completed"
            number={summary.projectSummary.completed}
            color="bg-cyan-800"
          />
          <SummaryCard
            icon={<FaHourglassHalf />}
            text="Projects Pending"
            number={summary.projectSummary.pending}
            color="bg-cyan-800"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
