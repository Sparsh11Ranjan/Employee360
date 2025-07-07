import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password }
      );
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem('token', response.data.token);
        if (response.data.user.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/employee-dashboard');
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError('Server Error');
      }
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Half: Image */}
      <div className="w-1/2 relative hidden md:block">
        <img
          src="/empPhoto.jpg"
          alt="Login Background"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
      </div>

      {/* Right Half: Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gradient-to-b from-teal-800 to-cyan-800 space-y-6">
        <h2 className="font-rowdies text-4xl text-white border border-black px-4 py-2">
          Employee360
        </h2>

        <div className="bg-white shadow border p-6 w-80">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border"
                placeholder="******"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-4 flex items-center justify-between">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-gray-700">Remember me</span>
              </label>
              <a href="#" className="text-cyan-900">Forgot password?</a>
            </div>

            <button type="submit" className="w-full bg-teal-900 text-white py-2">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
