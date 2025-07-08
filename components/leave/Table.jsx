import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { columns, LeaveButtons } from '../../utils/LeaveHelper';
import axios from 'axios';

const Table = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState(''); 

  const fetchLeaves = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/leave', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId?.employeeId || 'N/A',
          name: leave.employeeId?.userId?.name || 'N/A',
          leaveType: leave.leaveType || 'N/A',
          department: leave.employeeId?.department?.dep_name || 'N/A',
          rawStatus: leave.status, 
          status: <StatusPill status={leave.status} />,
          days:
            Math.max(
              1,
              Math.ceil(
                (new Date(leave.endDate) - new Date(leave.startDate)) /
                  (1000 * 60 * 60 * 24)
              )
            ),
          action: <LeaveButtons Id={leave._id} />,
        }));

        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      console.error('❌ Error fetching leaves:', error);
      alert(error.response?.data?.error || 'Error fetching leaves');
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  useEffect(() => {
    let filtered = leaves;

    if (searchText.trim()) {
      const keyword = searchText.toLowerCase();
      filtered = filtered.filter(
        (leave) =>
          leave.employeeId.toLowerCase().includes(keyword) ||
          leave.name.toLowerCase().includes(keyword)
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((leave) => leave.rawStatus === statusFilter);
    }

    setFilteredLeaves(filtered);
  }, [searchText, statusFilter, leaves]);

  return (
    <>
      {filteredLeaves ? (
        <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white p-6">
          <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6">
            <h3 className="text-3xl font-extrabold text-center text-cyan-800 mb-6">Manage Leaves</h3>

            <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 gap-4">
              <input
                type="text"
                placeholder="Search by Employee ID or Name..."
                className="px-4 py-2 border rounded-md shadow-sm w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
              />

              <div className="flex space-x-3">
                <FilterButton
                  text="Pending"
                  color="yellow"
                  active={statusFilter === 'Pending'}
                  onClick={() =>
                    setStatusFilter((prev) => (prev === 'Pending' ? '' : 'Pending'))
                  }
                />
                <FilterButton
                  text="Approved"
                  color="green"
                  active={statusFilter === 'Approved'}
                  onClick={() =>
                    setStatusFilter((prev) => (prev === 'Approved' ? '' : 'Approved'))
                  }
                />
                <FilterButton
                  text="Rejected"
                  color="red"
                  active={statusFilter === 'Rejected'}
                  onClick={() =>
                    setStatusFilter((prev) => (prev === 'Rejected' ? '' : 'Rejected'))
                  }
                />
              </div>
            </div>

            <DataTable
              columns={columns}
              data={filteredLeaves}
              pagination
              striped
              highlightOnHover
              responsive
              customStyles={{
                headRow: { style: { backgroundColor: '#e0f7fa' } },
              }}
            />
          </div>
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
};

const FilterButton = ({ text, color, active, onClick }) => {
  const base = {
    yellow: "bg-yellow-500 hover:bg-yellow-600",
    green: "bg-green-600 hover:bg-green-700",
    red: "bg-red-600 hover:bg-red-700",
  };

  const activeClass = active ? "ring-2 ring-offset-1 ring-cyan-700" : "";

  return (
    <button
      onClick={onClick}
      className={`px-4 py-1 text-white font-medium rounded ${base[color]} ${activeClass}`}
    >
      {text}
    </button>
  );
};

const StatusPill = ({ status }) => {
  let styles = "bg-gray-500 text-white";

  if (status === "Pending") styles = "bg-yellow-500 text-white";
  else if (status === "Approved") styles = "bg-green-600 text-white";
  else if (status === "Rejected") styles = "bg-red-600 text-white";

  return (
    <span className={`text-sm font-semibold px-3 py-1 rounded-full ${styles}`}>
      {status}
    </span>
  );
};

export default Table;
