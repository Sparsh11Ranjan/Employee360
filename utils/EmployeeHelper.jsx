import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

/** -----------------------------------
 * Employee Action Buttons
 * ---------------------------------- */
export const EmployeeButtons = ({ _id }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-nowrap gap-1 justify-center">
      <button
        className="bg-yellow-500 hover:bg-yellow-700 text-white text-xs px-3 py-1 rounded-md shadow transition"
        onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}
      >
        View
      </button>
      <button
        className="bg-green-600 hover:bg-green-800 text-white text-xs px-3 py-1 rounded-md shadow transition"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${_id}`)}
      >
        Edit
      </button>
      <button
        className="bg-blue-600 hover:bg-blue-800 text-white text-xs px-3 py-1 rounded-md shadow transition"
        onClick={() => navigate(`/admin-dashboard/employees/salary/${_id}`)}
      >
        Salary
      </button>
      <button
        className="bg-red-600 hover:bg-red-800 text-white text-xs px-3 py-1 rounded-md shadow transition"
        onClick={() => navigate(`/admin-dashboard/employees/leaves/${_id}`)}  // ✅ Fixed route
      >
        Leave
      </button>
    </div>
  );
};

/** -----------------------------------
 * Employee DataTable Columns
 * ---------------------------------- */
export const columns = [
  {
    name: "S.No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "130px",
  },
  {
    name: "Image",
    cell: (row) => (
      <img
        src={`http://localhost:5000/uploads/${row.profileImage}`}
        onError={(e) => (e.target.src = "/default-profile.png")}
        alt="Profile"
        className="h-10 w-10 rounded-full object-cover"
      />
    ),
    width: "100px",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    sortable: true,
    width: "150px",
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "140px",
  },
  {
    name: "Action",
    cell: (row) => <EmployeeButtons _id={row._id} />,
    style: { justifyContent: "center" },
    width: "270px",
  },
];

/** -----------------------------------
 * Fetch all departments
 * ---------------------------------- */
export const fetchDepartments = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No authentication token found");

    const response = await axios.get("http://localhost:5000/api/department", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.success ? response.data.departments : [];
  } catch (error) {
    console.error("Error fetching departments:", error);
    alert(error.response?.data?.error || "Error fetching departments");
    return [];
  }
};

/** -----------------------------------
 * Get employees by department ID
 * ---------------------------------- */
export const getEmployees = async (departmentId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No authentication token found");

    const response = await axios.get(`http://localhost:5000/api/employees/department/${departmentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.success ? response.data.employees : [];
  } catch (error) {
    console.error("Error fetching employees:", error);
    alert(error.response?.data?.error || "Error fetching employees");
    return [];
  }
};
