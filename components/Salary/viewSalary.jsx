import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ViewSalary = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null);
  const { id } = useParams();
  let sno = 1;

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/salary/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      alert(error.response?.data?.error || "Failed to fetch salary history");
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const filterSalaries = (e) => {
    const q = e.target.value;
    const filtered = salaries.filter((salary) =>
      salary.employeeId?.employeeId?.toLowerCase().includes(q.toLowerCase())
    );
    setFilteredSalaries(filtered);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-cyan-800">Salary History</h2>
      </div>

      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search by Emp ID"
          onChange={filterSalaries}
          className="px-3 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {!filteredSalaries ? (
        <div className="text-center text-gray-600 font-semibold">Loading...</div>
      ) : filteredSalaries.length === 0 ? (
        <div className="text-center text-gray-500 font-semibold">No salary records found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm text-left text-gray-700">
            <thead className="text-xs bg-cyan-100 text-cyan-800 uppercase">
              <tr>
                <th className="px-6 py-3">S.No</th>
                <th className="px-6 py-3">Emp ID</th>
                <th className="px-6 py-3">Basic Salary</th>
                <th className="px-6 py-3">Allowances</th>
                <th className="px-6 py-3">Deductions</th>
                <th className="px-6 py-3">Net Salary</th>
                <th className="px-6 py-3">Pay Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSalaries.map((salary) => (
                <tr key={salary._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-3">{sno++}</td>
                  <td className="px-6 py-3">{salary.employeeId?.employeeId || "N/A"}</td>
                  <td className="px-6 py-3">{salary.basicSalary}</td>
                  <td className="px-6 py-3">{salary.allowances}</td>
                  <td className="px-6 py-3">{salary.deductions}</td>
                  <td className="px-6 py-3 font-semibold text-green-700">{salary.netSalary}</td>
                  <td className="px-6 py-3">{new Date(salary.payDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewSalary;
