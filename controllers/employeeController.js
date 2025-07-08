import multer from "multer";
import path from "path";
import fs from "fs";
import bcrypt from "bcrypt";
import Employee from "../models/Employee.js";
import User from "../models/Users.js";
import Department from "../models/Department.js";

const uploadPath = "public/uploads";
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadPath),
  filename: (_, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "User already registered as employee",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
    });
    const savedUser = await newUser.save();

    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });
    await newEmployee.save();

    return res.status(200).json({
      success: true,
      message: "Employee created successfully",
    });
  } catch (error) {
    console.error("Error in addEmployee:", error.message);
    return res.status(500).json({
      success: false,
      error: "Server error while adding employee",
    });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");

    res.json({ success: true, employees });
  } catch (error) {
    console.error("Error in getEmployees:", error.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const getEmployee = async (req, res) => {
  const { id } = req.params;
  console.log("🔍 Hitting getEmployee with ID:", id);

  try {
    let employee;
    employee = await Employee.findById(id)
      .populate("userId", { password: 0 })
      .populate("department");

    if (!employee) {
      employee = await Employee.findOne({userId: id})
      .populate("userId", { password: 0 })
      .populate("department");
    }

    res.json({ success: true, employee });
  } catch (error) {
    console.error("Error in getEmployee:", error.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const editEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const {
      name,
      maritalStatus,
      designation,
      salary,
      department,
      dob,
      gender,
    } = req.body;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    const user = await User.findById(employee.userId);
    if (user) {
      user.name = name || user.name;

      if (req.file) {
        if (user.profileImage) {
          const oldImagePath = path.join(uploadPath, user.profileImage);
          if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
        }
        user.profileImage = req.file.filename;
      }

      await user.save();
    }

    employee.maritalStatus = maritalStatus || employee.maritalStatus;
    employee.designation = designation || employee.designation;
    employee.salary = salary || employee.salary;
    employee.department = department || employee.department;
    employee.dob = dob || employee.dob;
    employee.gender = gender || employee.gender;

    await employee.save();

    return res.status(200).json({ success: true, message: "Employee updated successfully" });
  } catch (error) {
    console.error("Error in editEmployee:", error.message);
    return res.status(500).json({
      success: false,
      error: "Server error during employee update",
    });
  }
};

const fetchEmployeesByDepId = async (req, res) => {
  const { id } = req.params;
  try {
    const employees = await Employee.find({ department: id })
      .populate("userId", "name") 
      .select("_id employeeId userId"); 

    return res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error("Error in fetchEmployeesByDepId:", error.message);
    return res.status(500).json({
      success: false,
      error: "Server error while fetching department employees",
    });
  }
};


export {
  addEmployee,
  upload,
  getEmployees,
  getEmployee,
  editEmployee,
  fetchEmployeesByDepId,
};
