import React, { useState, useEffect } from 'react';
import { HiInboxArrowDown, HiMiniXMark } from "react-icons/hi2";
import Select from 'react-select';

interface User {
  userID: string;
  username: string;
  email: string;
  role: 'superAdmin' | 'admin' | 'person';
}

interface EditUserProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

const roleOptions = [
  { value: 'superAdmin', label: 'Super Admin' },
  { value: 'admin', label: 'Admin' },
  { value: 'person', label: 'Person' },
];

const EditUser: React.FC<EditUserProps> = ({ user, onUpdateUser }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState(user.role);

  useEffect(() => {
    setUsername(user.username);
    setEmail(user.email);
    setRole(user.role);
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const updatedUser = {
      userID: user.userID,
      username,
      email,
      password,
      role,
    };

    onUpdateUser(updatedUser);
  };

  return (
    <div className="flex justify-center items-center font-sans text-black bg-gray-50">
      <div className="w-full max-w-2xl p-6 bg-white rounded-xl ">
        <h2 className="text-2xl font-semibold text-black mb-6">Edit User</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-[16px] font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full pl-4 py-2 border rounded-[13px] bg-white hover:bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#C84B2F]"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-[16px] font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-4 py-2 border rounded-[13px] bg-white hover:bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#C84B2F]"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-[16px] font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank to keep current password"
              className="w-full pl-4 py-2 border rounded-[13px] bg-white hover:bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#C84B2F]"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirm-password" className="block text-[16px] font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              className="w-full pl-4 py-2 border rounded-[13px] bg-white hover:bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#C84B2F]"
            />
          </div>

          {/* Role (React Select) */}
          <div>
            <label htmlFor="role" className="block text-[16px] font-medium text-gray-700 mb-1">
              Role
            </label>
            <Select
              options={roleOptions}
              value={roleOptions.find((option) => option.value === role)}
              onChange={(selected) => {
                if (selected) {
                  setRole(selected.value as 'superAdmin' | 'admin' | 'person');
                }
              }}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  height:  '42px',
                  borderRadius: '8px',                  
                  borderColor: state.isFocused ? '' : '',
                  boxShadow: state.isFocused ? '0 0 0 2px #FCD9D1' : 'none',
                  paddingLeft: '4px',
                  backgroundColor: '#FFFFFF',
                  '&:hover': {
                    backgroundColor: '#F7F7F7',
                  },
                }),
                option: (provided, state) => {
                  let backgroundColor = 'white';
                  let color = 'black';
          
                  if (state.isSelected) {
                    backgroundColor = '#C84B2F';
                    color = 'white';
                  } else if (state.isFocused) {
                    backgroundColor = '#FCD9D1';
                  }
          
                  return {
                    ...provided,
                    backgroundColor,
                    color,
                    fontWeight: state.isSelected ? 'bold' : 'normal',
                    cursor: 'pointer',
                  };
                },
              }}
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 pt-4 text-[14px]">
            <button
              type="submit"
              className="flex items-center jutify-center px-[15px] py-[5px] bg-[#C84B2F] text-white font-semibold rounded-[9px] hover:bg-[#C63F21] focus:outline-none focus:ring-2 focus:ring-[#C84B2F]"
            >
              <HiInboxArrowDown size={20} className="mr-2" />
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="flex items-center jutify-center px-[15px] py-[5px] bg-[#F4F4F4] text-[#333333] font-semibold rounded-[9px] hover:bg-[#D4D4D4] focus:outline-none focus:ring-2 focus:ring-[#F4F4F4]"
            >
              <HiMiniXMark size={20} className="mr-2" />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
