import express from "express";
import {
  addProject,
  getAllProjects,
  getEmployeeProjects,
  markProjectComplete
} from "../controllers/projectController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addProject);
router.get("/all", authMiddleware, getAllProjects);
router.get("/employee/:employeeId", authMiddleware, getEmployeeProjects);
router.patch("/complete/:id", authMiddleware, markProjectComplete);

export default router;
