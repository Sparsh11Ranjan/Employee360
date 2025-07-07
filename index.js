import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectToDatabase from './db/db.js';

// Route imports
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
import salaryRouter from "./routes/salary.js";
import leaveRouter from "./routes/leave.js"; // ✅ fixed
import settingRouter from "./routes/setting.js"
import dashboardRouter from "./routes/dashboard.js"

const app = express();
connectToDatabase();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('public/uploads'));

app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/employees", employeeRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/setting", settingRouter);
app.use("/api/dashboard", dashboardRouter); 

console.log("Employee routes mounted at /api/employees");

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
