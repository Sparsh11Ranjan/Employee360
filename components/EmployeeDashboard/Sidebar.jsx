import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUser,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCogs
} from 'react-icons/fa';
import { useAuth } from '../../context/authContext';

const Sidebar = () => {
  const { user } = useAuth();

  const navLinks = [
    {
      section: "Main",
      links: [
        { to: "/employee-dashboard", icon: <FaTachometerAlt />, label: "Dashboard", exact: true }
      ]
    },
    {
      section: "Management",
      links: [
        { to: `/employee-dashboard/profile/${user?._id || ""}`, icon: <FaUser />, label: "My Profile" },
        { to: `/employee-dashboard/leave/${user._id}`, icon: <FaCalendarAlt />, label: "Leave" },
        { to: `/employee-dashboard/salary/${user._id}`, icon: <FaMoneyBillWave />, label: "Salary" },
        { to: "/employee-dashboard/settings", icon: <FaCogs />, label: "Settings" },
      ]
    }
  ];

  return (
    <aside className="bg-gray-900 text-white h-screen fixed left-0 top-0 bottom-0 w-64 shadow-xl z-10">
      {/* Logo */}
      <div className="bg-cyan-900 h-14 flex items-center justify-center">
        <h1 className="text-xl font-bold font-rowdies tracking-wide">Employee360</h1>
      </div>

      {/* Navigation */}
      <div className="px-4 py-6 space-y-6 text-sm">
        {navLinks.map((section, idx) => (
          <div key={idx}>
            <p className="text-gray-400 uppercase mb-2 px-2">{section.section}</p>
            {section.links.map(({ to, icon, label, exact }) => (
              <NavLink
                key={label}
                to={to}
                end={exact}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2.5 px-4 rounded-md font-medium transition-all duration-200
                   ${isActive ? "bg-cyan-800 text-white" : "text-gray-300 hover:bg-cyan-700 hover:text-white"}`
                }
              >
                {icon}
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
