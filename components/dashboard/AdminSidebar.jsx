import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUser,
  FaBuilding,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCogs,
  FaClipboardList, 
} from 'react-icons/fa';

const navLinks = [
  {
    section: "Main",
    links: [
      {
        to: "/admin-dashboard",
        icon: <FaTachometerAlt />,
        label: "Dashboard",
        exact: true
      }
    ]
  },
  {
    section: "Management",
    links: [
      {
        to: "/admin-dashboard/employees",
        icon: <FaUser />,
        label: "Employee"
      },
      {
        to: "/admin-dashboard/departments",
        icon: <FaBuilding />,
        label: "Department"
      },
      {
        to: "/admin-dashboard/leaves",
        icon: <FaCalendarAlt />,
        label: "Leave"
      },
      {
        to: "/admin-dashboard/salary/add",
        icon: <FaMoneyBillWave />,
        label: "Salary"
      },
      {
        to: "/admin-dashboard/projects", 
        icon: <FaClipboardList />,
        label: "Projects"
      },
      {
        to: "/admin-dashboard/settings",
        icon: <FaCogs />,
        label: "Settings"
      }
    ]
  }
];

const AdminSidebar = () => {
  return (
    <aside className="bg-gray-900 text-white h-screen fixed left-0 top-0 w-64 shadow-xl z-10">
      <div className="bg-cyan-900 h-14 flex items-center justify-center">
        <h1 className="text-xl font-bold font-rowdies tracking-wide">Employee360</h1>
      </div>
      <nav className="px-4 py-6 text-sm space-y-6 overflow-y-auto h-[calc(100%-56px)]">
        {navLinks.map((section, index) => (
          <div key={index}>
            <p className="text-gray-400 uppercase text-xs mb-2 px-2">{section.section}</p>
            <ul className="space-y-1">
              {section.links.map(({ to, icon, label, exact }) => (
                <li key={label}>
                  <NavLink
                    to={to}
                    end={exact}
                    className={({ isActive }) =>
                      `flex items-center gap-3 py-2 px-4 rounded-md transition-all duration-200 font-medium ${
                        isActive
                          ? "bg-cyan-800 text-white"
                          : "text-gray-300 hover:bg-cyan-700 hover:text-white"
                      }`
                    }
                  >
                    <span className="text-lg">{icon}</span>
                    <span>{label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
