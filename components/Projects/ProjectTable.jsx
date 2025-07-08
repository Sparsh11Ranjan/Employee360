import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/authContext';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const ProjectTable = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [search, setSearch] = useState('');

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/projects/all', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.data.success) {
        let sno = 1;
        const data = res.data.projects.map((project) => ({
          _id: project._id,
          sno: sno++,
          title: project.title,
          employeeName: project.assignedTo?.userId?.name || 'N/A',
          department: project.assignedTo?.department?.dep_name || 'N/A',
          status: project.status,
          assignedDate: new Date(project.createdAt).toLocaleDateString(),
        }));
        setProjects(data);
        setFilteredProjects(data);
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
      alert("Failed to fetch projects.");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    const keyword = search.toLowerCase();
    const filtered = projects.filter((p) =>
      p.title.toLowerCase().includes(keyword)
    );
    setFilteredProjects(filtered);
  }, [search, projects]);

  const columns = [
    { name: "S.No", selector: (row) => row.sno, width: "70px" },
    { name: "Title", selector: (row) => row.title, sortable: true },
    { name: "Employee", selector: (row) => row.employeeName, sortable: true },
    { name: "Department", selector: (row) => row.department },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            row.status === 'Completed'
              ? 'bg-green-600 text-white'
              : 'bg-yellow-300 text-gray-900'
          }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
    { name: "Assigned Date", selector: (row) => row.assignedDate },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-cyan-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <h3 className="text-3xl font-extrabold text-center text-cyan-800 mb-6">
          All Projects
        </h3>

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by project title"
            className="w-full md:w-1/3 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {user?.role === 'admin' && (
            <Link
              to="/admin-dashboard/projects/add"
              className="bg-cyan-700 hover:bg-cyan-800 transition-all text-white font-semibold px-5 py-2.5 rounded-md shadow-lg text-center"
            >
              + Add New Project
            </Link>
          )}
        </div>

        <DataTable
          columns={columns}
          data={filteredProjects}
          pagination
          striped
          highlightOnHover
          noDataComponent="There are no records to display"
          customStyles={{
            headRow: {
              style: {
                backgroundColor: '#e0f7fa',
              },
            },
            rows: {
              style: {
                transition: 'background 0.3s ease-in-out',
              },
              highlightOnHoverStyle: {
                backgroundColor: '#f0fdf4',
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default ProjectTable;
