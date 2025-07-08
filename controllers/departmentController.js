import Department from "../models/Department.js";

export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json({ success: true, departments });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

export const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(404).json({ success: false, error: "Not found" });
    res.json({ success: true, department });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

export const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;
    const newDep = new Department({ dep_name, description });
    await newDep.save();
    res.json({ success: true, message: "Department added" });
  } catch (err) {
    res.status(500).json({ success: false, error: "Error adding department" });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;
    await Department.findByIdAndUpdate(req.params.id, { dep_name, description });
    res.json({ success: true, message: "Department updated" });
  } catch (err) {
    res.status(500).json({ success: false, error: "Update failed" });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }

    await department.deleteOne(); 

    res.json({ success: true, message: "Department deleted", id: department._id });
  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(500).json({ success: false, error: "Delete failed" });
  }
};
