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

router.get("/", authMiddleware, getEmployees);

router.post("/add", authMiddleware, upload.single("image"), addEmployee);

router.get("/:id", authMiddleware, getEmployee);

router.put("/edit/:id", authMiddleware, upload.single("image"), editEmployee);

router.get("/department/:id", authMiddleware, fetchEmployeesByDepId);

export default router;
