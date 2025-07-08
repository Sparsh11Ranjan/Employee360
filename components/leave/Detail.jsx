import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    if (!id) return;

    const fetchLeave = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/leave/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        console.error(" Error fetching leave:", error);
        alert(error.response?.data?.error || "Error fetching leave details");
      }
    };

    fetchLeave();
  }, [id]);

  const handleStatusUpdate = async (id, status) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/leave/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    if (response.data.success) {
      navigate('/admin-dashboard/leaves');
    } else {
      alert(" Failed to update leave status");
    }
  } catch (error) {
    console.error(" Error updating status:", error);
    alert(error.response?.data?.error || "Server error");
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white p-6">
      {leave ? (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-3xl font-extrabold text-cyan-800 mb-8 text-center">Leave Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

         
            <div className="flex justify-center items-start">
              <img
                src={`http://localhost:5000/uploads/${leave.employeeId?.userId?.profileImage}`}
                alt="Profile"
                onError={(e) => (e.target.src = "/default-profile.jpg")}
                className="w-72 h-72 rounded-full object-cover border-4 border-cyan-600 shadow-md"
              />
            </div>

            <div className="space-y-4 text-gray-700">
              <ProfileItem label="Name" value={leave.employeeId?.userId?.name || "N/A"} />
              <ProfileItem label="Employee ID" value={leave.employeeId?.employeeId || "N/A"} />
              <ProfileItem label="Leave Type" value={leave.leaveType || "N/A"} />
              <ProfileItem label="Reason" value={leave.reason || "N/A"} />
              <ProfileItem label="Department" value={leave.employeeId?.department?.dep_name || "N/A"} />
              <ProfileItem label="Start Date" value={new Date(leave.startDate).toLocaleDateString()} />
              <ProfileItem label="End Date" value={new Date(leave.endDate).toLocaleDateString()} />

           
              <div className="flex items-center">
                <p className="w-40 text-cyan-800 font-semibold">Status:</p>
                <div className="flex-1">
                  {leave.status === "Pending" ? (
                    <div className="flex space-x-3">
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded shadow"
                        onClick={() => handleStatusUpdate(leave._id,"Approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded shadow"
                        onClick={() => handleStatusUpdate(leave._id,"Rejected")}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        leave.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {leave.status}
                    </span>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-20 text-lg font-medium">
          Loading leave data...
        </div>
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

export default Detail;
