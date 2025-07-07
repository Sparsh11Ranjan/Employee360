import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper';
import axios from "axios";
import { Search } from 'lucide-react';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const onDepartmentDelete = (id) => {
    const updated = departments.filter(dep => dep._id !== id);
    setDepartments(updated);
    setFilteredDepartments(updated);
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/department", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: <DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete} />
          }));
          setDepartments(data);
          setFilteredDepartments(data);
        }
      } catch (error) {
        alert(error.response?.data?.error || "Error fetching departments");
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(searchValue)
    );
    setFilteredDepartments(filtered);
  };

  return (
    <div className="p-6 bg-gradient-to-b from-cyan-50 to-white min-h-screen">
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold text-cyan-800">Manage Departments</h3>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            onChange={filterDepartments}
            placeholder="Search by department name"
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600"
          />
        </div>

        <Link
          to="/admin-dashboard/add-department"
          className="bg-cyan-700 hover:bg-cyan-800 text-white font-semibold px-5 py-2 rounded-md shadow-md transition"
        >
          + Add New Department
        </Link>
      </div>

      <div className="bg-white p-5 rounded-lg shadow-md">
        <DataTable
          columns={columns}
          data={filteredDepartments.map((dep, index) => ({
            ...dep,
            sno: index + 1,
            action: <DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete} />
          }))}
          pagination
          highlightOnHover
          striped
          responsive
          noHeader
          customStyles={{
            headCells: {
              style: {
                fontWeight: 'bold',
                fontSize: '15px',
                backgroundColor: '#ecfeff',
                color: '#0e7490',
              },
            },
            rows: {
              style: {
                fontSize: '14px',
              },
            },
          }}
        />
      </div>

      {depLoading && (
        <div className="text-center text-gray-500 mt-10 text-lg font-medium">Loading departments...</div>
      )}
    </div>
  );
};

export default DepartmentList;
