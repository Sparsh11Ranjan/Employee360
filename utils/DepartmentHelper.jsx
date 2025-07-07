import { useNavigate } from "react-router-dom";
import axios from "axios";

export const columns = [
    {
        name: "S.no",
        selector: (row) => row.sno

    },
    {
         name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true
    },
    {
         name: "Action",
        selector: (row) => row.action
    },
];

export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirm = window.confirm("Do you want to delete?");
    if (confirm) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/department/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data.success) {
          onDepartmentDelete(id);
        }
      } catch (error) {
        alert(error.response?.data?.error || "Error deleting department");
      }
    }
  };

  return (
    <div className="flex space-x-2">
      <button
        className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded shadow"
        onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
      >
        Edit
      </button>
      <button
        className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded shadow"
        onClick={() => handleDelete(_id)}
      >
        Delete
      </button>
    </div>
  );
};
