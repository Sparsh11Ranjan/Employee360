import express from "express";
import {
  addEmployee,
  upload,
  getEmployees,
  getEmployee,
  editEmployee,
  fetchEmployeesByDepId,
} from "../controllers/employeeController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Get all employees
router.get("/", authMiddleware, getEmployees);

// ✅ Add employee with image upload
router.post("/add", authMiddleware, upload.single("image"), addEmployee);

// ✅ Get single employee by ID
router.get("/:id", authMiddleware, getEmployee);

// ✅ Edit employee by ID with optional image update
router.put("/edit/:id", authMiddleware, upload.single("image"), editEmployee);

// ✅ Get employees by department ID
router.get("/department/:id", authMiddleware, fetchEmployeesByDepId);

export default router;
