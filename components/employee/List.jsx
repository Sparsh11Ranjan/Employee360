import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { EmployeeButtons } from '../../utils/EmployeeHelper';

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployee, setFilteredEmployee] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/employees", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department?.dep_name || "N/A",
            name: emp.userId?.name || "N/A",
            dob: new Date(emp.dob).toLocaleDateString(),
            profileImage: emp.userId?.profileImage || "",
          }));
          setEmployees(data);
          setFilteredEmployee(data);
        }
      } catch (error) {
        alert(error.response?.data?.error || "Error fetching employees");
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = employees.filter(emp =>
      emp.name.toLowerCase().includes(searchValue) ||
      emp.dep_name.toLowerCase().includes(searchValue)
    );
    setFilteredEmployee(filtered);
  };

  const columns = [
    { name: "S.No", selector: (row) => row.sno, sortable: true, width: "70px" },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "DOB", selector: (row) => row.dob },
    { name: "Department", selector: (row) => row.dep_name },
    {
      name: "Profile",
      cell: (row) => (
        <img
          src={`http://localhost:5000/uploads/${row.profileImage}`}
          onError={(e) => (e.target.src = "/default-profile.png")}
          alt="Profile"
          className="h-10 w-10 rounded-full object-cover border border-gray-300 shadow-sm"
        />
      ),
      width: "100px",
    },
    {
      name: "Action",
      cell: (row) => <EmployeeButtons _id={row._id} />,
      width: "280px",
      center: true,
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-b from-cyan-50 to-white min-h-screen">
      <div className="text-center mb-6">
        <h3 className="text-3xl font-extrabold text-cyan-800 tracking-wide">Manage Employees</h3>
        <p className="text-gray-500 text-sm mt-1">Add, edit, and manage employee records</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            onChange={handleFilter}
            placeholder="Search by name or department..."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 bg-white shadow-sm"
          />
        </div>

        <Link
          to="/admin-dashboard/add-employee"
          className="bg-cyan-700 hover:bg-cyan-800 transition-all text-white font-semibold px-5 py-2.5 rounded-md shadow-lg"
        >
          + Add New Employee
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <DataTable
          columns={columns}
          data={filteredEmployee}
          progressPending={empLoading}
          pagination
          highlightOnHover
          striped
          responsive
          customStyles={{
            headCells: {
              style: {
                fontWeight: 'bold',
                fontSize: '14px',
                backgroundColor: '#e0f2fe',
                color: '#0369a1',
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default List;
