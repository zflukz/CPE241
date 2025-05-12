import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('person'); // default role or make selectable

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, role }),
      });

      if (!response.ok) {
        alert('Registration failed. Please try again.');
        return;
      }

      const data = await response.json();
      alert('Registration successful! You can now log in.');
      navigate('/login');
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-4 items-center">
          <div className="text-4xl">
            <img src='/images/logo/logo.png' alt="Logo" />
          </div>
          <h2 className='font-bold text-[#C84B2F] text-[40px] ml-2'>Register</h2>
        </div>

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 mb-2 font-bold">Username</label>
            <input
              type="text"
              id="username"
              className="w-full p-3 border border-black rounded-md"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-2 font-bold">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-black rounded-md"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-8">
            <label htmlFor="password" className="block text-gray-600 mb-2 font-bold">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-black rounded-md"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Optional: Dropdown to choose role */}
          {/* 
          <div className="mb-4">
            <label className="block text-gray-600 mb-2 font-bold">Role</label>
            <select
              className="w-full p-3 border border-black rounded-md"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="passenger">Passenger</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          */}

          <button
            type="submit"
            className="w-full bg-[#E3956D] text-white p-3 rounded-md hover:bg-orange-600 transition duration-300 border border-black"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
