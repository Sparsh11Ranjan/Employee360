import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";

// POST /api/leave/add
const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;

    const employee = await Employee.findOne({ userId });

    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason,
      appliedAt: new Date(),
      status: "Pending"
    });

    await newLeave.save();

    return res.status(200).json({ success: true, message: "Leave added successfully" });
  } catch (error) {
    console.error("❌ Error adding leave:", error.message);
    return res.status(500).json({ success: false, error: "Server error while adding leave" });
  }
};

// GET /api/leave/:id
// GET /api/leave/:id
const getLeave = async (req, res) => {
  try {
    const { id } = req.params;

    // First, try to find leaves directly using employeeId (ObjectId)
    let leaves = await Leave.find({ employeeId: id }).sort({ appliedAt: -1 });

    if (leaves.length > 0) {
      return res.status(200).json({ success: true, leaves });
    }

    // If no leaves found, try using userId → find employee
    const employee = await Employee.findOne({ userId: id });

    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    // Try again with the actual employee._id
    leaves = await Leave.find({ employeeId: employee._id }).sort({ appliedAt: -1 });

    // Even if leaves is empty, return success with empty array
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.error("❌ Error getting leave:", error);
    return res.status(500).json({ success: false, error: "Server error while getting leave" });
  }
};




// GET /api/leave/
const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: [
        { path: 'department', select: 'dep_name' },
        { path: 'userId', select: 'name' },
      ]
    });

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.error("❌ Error getting leaves:", error.message);
    return res.status(500).json({ success: false, error: "Server error while getting leaves" });
  }
};

// GET /api/leave/detail/:id
const getLeaveDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const leave = await Leave.findById(id).populate({
      path: "employeeId",
      populate: [
        { path: 'department', select: 'dep_name' },
        { path: 'userId', select: 'name profileImage' },
      ]
    });

    if (!leave) {
      return res.status(404).json({ success: false, error: "Leave not found" });
    }

    return res.status(200).json({ success: true, leave });
  } catch (error) {
    console.error("❌ Error getting leave:", error.message);
    return res.status(500).json({ success: false, error: "Server error while getting leave" });
  }
};

// PUT /api/leave/:id
const updateLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedLeave = await Leave.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedLeave) {
      return res.status(404).json({ success: false, error: "Leave not found" });
    }

    return res.status(200).json({ success: true, message: "Leave status updated", leave: updatedLeave });
  } catch (error) {
    console.error("❌ Error updating leave:", error.message);
    return res.status(500).json({ success: false, error: "Server error while updating leave" });
  }
};

export {
  addLeave,
  getLeave,
  getLeaves,
  getLeaveDetail,
  updateLeave
};
