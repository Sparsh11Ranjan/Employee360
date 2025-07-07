import express from "express";
import {
  getDepartments,
  getDepartmentById,
  addDepartment,
  updateDepartment,
  deleteDepartment
} from "../controllers/departmentController.js";
import verifyUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(verifyUser);
router.get("/", getDepartments);
router.get("/:id", getDepartmentById);
router.post("/add", addDepartment);
router.put("/:id", updateDepartment);
router.delete("/:id", deleteDepartment);

export default router;
