import React, { FC, useState, ChangeEvent, FormEvent } from 'react';

// Reuse or define the User type
interface User {
  userID: string;
  username: string;
  email: string;
  password : string;
  role: 'superAdmin' | 'admin' | 'person';
}

interface EditUserProps {
  user: User;
  onUpdateUser: (user: User | null) => void;
}

const EditUser: FC<EditUserProps> = ({ user, onUpdateUser }) => {
  const [formData, setFormData] = useState<User>({ ...user });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: User) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdateUser(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-[#C84B2F] mb-4">Edit User</h2>

      <div>
        <label className="block text-sm font-medium">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          type="text"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="person">Person</option>
          <option value="admin">Admin</option>
          <option value="superAdmin">Super Admin</option>
        </select>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => onUpdateUser(null)}
        >
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-[#C84B2F] text-white rounded">
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditUser;
