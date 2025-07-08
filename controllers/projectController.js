import Project from "../models/Project.js";
import Employee from "../models/Employee.js";

export const addProject = async (req, res) => {
  try {
    const { title, description, deadline, assignedTo } = req.body;

    const employee = await Employee.findById(assignedTo);
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    const project = new Project({ title, description, deadline, assignedTo });
    await project.save();

    res.status(201).json({ success: true, message: "Project assigned successfully", project });
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate({
        path: "assignedTo",
        populate: [
          { path: "userId", select: "name" },
          { path: "department", select: "dep_name" }
        ]
      });

    res.json({ success: true, projects });
  } catch (error) {
    console.error("Error fetching all projects:", error);
    res.status(500).json({ success: false, error: "Failed to fetch projects" });
  }
};

export const getEmployeeProjects = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const employee = await Employee.findOne({ userId: employeeId });
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    const projects = await Project.find({ assignedTo: employee._id })
      .populate({
        path: "assignedTo",
        populate: [
          { path: "userId", select: "name" },
          { path: "department", select: "dep_name" }
        ]
      });

    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching employee projects:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// ✅ PATCH /api/projects/complete/:id
export const markProjectComplete = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { status: "Completed" },
      { new: true }
    );
    res.status(200).json({ success: true, message: "Marked as completed", project });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update failed" });
  }
};
