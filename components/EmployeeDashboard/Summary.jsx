import React from 'react';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';


const Summary = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>; 
  }

  return (
    <div className="rounded-lg flex bg-white shadow-md overflow-hidden">
      <div className="text-3xl flex items-center justify-center bg-cyan-800 text-white px-5 py-6">
        <FaUser />
      </div>
      <div className="pl-4 py-4">
        <p className="text-gray-600 text-sm">Welcome Back</p>
        <p className="text-2xl font-bold">{user?.name || 'Guest'}</p>
      </div>
    </div>
  );
};


export default Summary;
