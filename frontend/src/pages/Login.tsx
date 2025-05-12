import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/Usercontext";
const Login: React.FC = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('Login form submitted:', { email, password, rememberMe });
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log(JSON.stringify({ email, password }));
      if (!response.ok) {
        alert('Login failed. Please check your credentials.');
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      setUser({
        id: data.userID,
        name: data.username,
        email: data.email,
        role: data.role
      });
      if (data.role == "admin")
        navigate('/dashboard');
      else
        navigate('/Home');
    }
    // Add your login logic here (e.g., API call)
    catch (error) {
      alert('Login failed. Please check your credentials.');
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

        <div className="flex justify-center mb-4 items-center">
          {/* Chicken logo */}
          <div className="text-4xl">
            <img src='/images/logo/logo.png' className=''></img>
          </div>
          <h2 className='font-bold text-[#C84B2F] text-[40px] ml-2'>Login</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-2 font-bold">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-black rounded-md"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 mb-2 font-bold">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-black rounded-md"
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
            className="w-full bg-[#E3956D] text-white p-3 rounded-md hover:bg-orange-600 transition duration-300 border border-black"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">Don't have an account? <span
  onClick={() => navigate('/register')}
  className="text-blue-600 hover:underline cursor-pointer"
>
  Register
</span></p>
        </div>

        <div className="flex items-center justify-center mt-6">
          <hr className="w-full border-gray-300" />
          <span className="absolute left-1/2 transform -translate-x-1/2 bg-white px-3 text-sm text-gray-600">or</span>
        </div>

        <button
          className="w-full bg-white border border-black p-3 rounded-md flex items-center justify-center mt-6 hover:bg-gray-50 transition duration-300"
        >
          <img src="/images/logo/google.png" alt="Google" className="w-5 h-5 mr-3" />
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
