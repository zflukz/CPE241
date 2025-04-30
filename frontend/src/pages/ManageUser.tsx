import React from 'react';
import { Button } from '../components/Button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../components/Table';
import { Badge } from '../components/Badge';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '../components/Pagination';
import { FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import { HiPlusCircle } from "react-icons/hi";
import { HiBarsArrowDown } from "react-icons/hi2";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

interface User {
  userID: string;
  username: string;
  email: string;
  role: 'Customer' | 'Admin';
}

const users: User[] = [
  { userID: 'U001', username: 'user001', email: 'yourname@gmail.com', role: 'Customer'},
  { userID: 'U002', username: 'user002', email: 'yourname@gmail.com', role: 'Customer'},
  { userID: 'U003', username: 'user003', email: 'yourname@gmail.com', role: 'Admin'},
  { userID: 'U004', username: 'user004', email: 'yourname@gmail.com', role: 'Customer'},
  { userID: 'U005', username: 'user005', email: 'yourname@gmail.com', role: 'Customer'},
  { userID: 'U006', username: 'user006', email: 'yourname@gmail.com', role: 'Admin'},
  { userID: 'U007', username: 'user007', email: 'yourname@gmail.com', role: 'Customer'},
];

const ManageUsers = () => {
  return (
    <div className="flex min-h-screen font-sans">
      <Navbar />
      <div className="flex-1 p-8 bg-[#FAF9F8] overflow-auto">
        <div className="flex items-center justify-between mt-8 mb-8">
          <h1 className="text-[24px] font-bold">Manage Users ({users.length})</h1>
          <div className="flex items-center gap-4">
            <div className="relative w-1/3">
              <input
                type="text"
                placeholder="Search here"
                className="w-full pl-10 py-2 border rounded-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-[#C84B2F]"
              />
              <HiMiniMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C84B2F]" />
            </div>
            <Button variant="outline" className='flex items-center gap-2 bg-[#FFFFFF] font-semibold focus:outline-none focus:ring-2 focus:ring-[#C84B2F]'>
              <HiBarsArrowDown size={20} /> Filter
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-[#C84B2F] text-white font-semibold border-0 hover:bg-[#C63F21] focus:ring-0"
            >
              <HiPlusCircle size={20} />
              Add User
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-[#D4D4D4]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">User ID</TableHead>
                <TableHead className="text-center">Username</TableHead>
                <TableHead className="text-center">Email</TableHead>
                <TableHead className="text-center">Role</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center">{user.userID}</TableCell>
                  <TableCell className="text-center">{user.username}</TableCell>
                  <TableCell className="text-center">{user.email}</TableCell>
                  <TableCell className="text-center">
				  <Badge variant={user.role === 'Admin' ? 'success' : 'default'}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex gap-2 justify-center">
                    <Button size="sm" variant="ghost" className='text-[#C84B2F] hover:bg-[#C63F21]/10 focus:ring-2 focus:ring-[#C63F21]'><FiEye size={18} /></Button>
                    <Button size="sm" variant="ghost" className='text-[#C84B2F] hover:bg-[#C63F21]/10 focus:ring-2 focus:ring-[#C63F21]'><FiEdit2 size={18} /></Button>
                    <Button size="sm" variant="ghost" className='text-[#C84B2F] hover:bg-[#C63F21]/10 focus:ring-2 focus:ring-[#C63F21]'><FiTrash2 size={18} /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600">Rows per page: 7</div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
