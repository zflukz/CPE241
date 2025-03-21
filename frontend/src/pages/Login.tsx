import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here (e.g., API call)
    console.log('Login Submitted', { email, password, rememberMe });
    navigate('/content');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-4">
          {/* Chicken logo */}
          <div className="text-4xl text-orange-500">
            <span role="img" aria-label="chicken">🐔</span>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <label htmlFor="rememberMe" className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2"
              />
              Remember me
            </label>
            <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white p-3 rounded-md hover:bg-orange-600 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">Don't have an account? <a href="#" className="text-blue-600 hover:underline">Register</a></p>
        </div>

        <div className="flex items-center justify-center mt-6">
          <hr className="w-full border-gray-300" />
          <span className="absolute left-1/2 transform -translate-x-1/2 bg-white px-3 text-sm text-gray-600">or</span>
        </div>

        <button
          className="w-full bg-white border border-gray-300 p-3 rounded-md flex items-center justify-center mt-6 hover:bg-gray-50 transition duration-300"
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/75/Google_icon_%28gray%29.svg" alt="Google" className="w-5 h-5 mr-3" />
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
