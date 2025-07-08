import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login"
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";

import AdminSummary from "./components/dashboard/AdminSummary";

import DepartmentList from "./components/department/DepartmentList";
import AddDepartment from "./components/department/AddDepartment";
import EditDepartment from "./components/department/EditDepartment";

import List from "./components/employee/List";
import Add from "./components/employee/Add";
import View from "./components/employee/view";
import Edit from "./components/employee/Edit";
import AddSalary from "./components/Salary/AddSalary";
import ViewSalary from "./components/Salary/viewSalary";

import Summary from "./components/EmployeeDashboard/Summary";
import LeaveList from "./components/leave/leaveList";
import AddLeave from "./components/leave/addLeave";
import Settings from "./components/EmployeeDashboard/Setting";
import Table from "./components/leave/Table";
import Detail from "./components/leave/Detail";

import ProjectTable from "./components/Projects/ProjectTable";
import ProjectList from "./components/Projects/ProjectList";
import AddProject from "./components/Projects/AddProject";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />} />
          <Route path="departments" element={<DepartmentList />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route path="department/:id" element={<EditDepartment />} />
          <Route path="employees" element={<List />} />
          <Route path="add-employee" element={<Add />} />
          <Route path="employees/:id" element={<View />} />
          <Route path="employees/edit/:id" element={<Edit />} />
          <Route path="salary/add" element={<AddSalary />} />
          <Route path="leaves" element={<Table />} />
          <Route path="leaves/:id" element={<Detail />} />
          <Route path="employees/leaves/:id" element={<LeaveList />} />
          <Route path="employees/salary/:id" element={<ViewSalary />} />
          <Route path="projects" element={<ProjectTable />} />
          <Route path="projects/add" element={<AddProject />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin", "employee"]}>
                <EmployeeDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<Summary />} />
          <Route path="profile/:id" element={<View />} />
          <Route path="leave/:id" element={<LeaveList />} />
          <Route path="add-leave" element={<AddLeave />} />
          <Route path="salary/:id" element={<ViewSalary />} />
          <Route path="projects" element={<ProjectList />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
