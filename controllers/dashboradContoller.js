import Department from "../models/Department.js";
import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";

const getSummary = async (req, res) => {
  try {
    // 1. Total employees
    const totalEmployees = await Employee.countDocuments();

    // 2. Total departments
    const totalDepartments = await Department.countDocuments();

    // 3. Total salary (aggregated)
    const totalSalaries = await Employee.aggregate([
      { $group: { _id: null, totalSalary: { $sum: "$salary" } } }
    ]);

    // 4. Unique employees who applied for leave
    const employeeAppliedForLeave = await Leave.distinct("employeeId");

    // 5. Leave status counts
    const leaveStatus = await Leave.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    // 6. Organize leave summary by status
    const leaveSummary = {
      appliedFor: employeeAppliedForLeave.length,
      approved: leaveStatus.find((item) => item._id === "Approved")?.count || 0,
      rejected: leaveStatus.find((item) => item._id === "Rejected")?.count || 0,
      pending: leaveStatus.find((item) => item._id === "Pending")?.count || 0
    };

    return res.status(200).json({
      success: true,
      totalEmployees,
      totalDepartments,
      totalSalary: totalSalaries[0]?.totalSalary || 0,
      leaveSummary
    });
  } catch (error) {
    console.error("❌ Dashboard summary error:", error.message);
    return res.status(500).json({ success: false, error: "Dashboard summary error" });
  }
};

export { getSummary };
