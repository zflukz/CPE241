import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../components/Table';
import { Badge } from '../components/Badge';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '../components/Pagination';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import { HiBarsArrowDown } from "react-icons/hi2";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import TopNavbar from '../components/TopNavBar';
import EditUser from '../components/EditUser';

interface User {
  userID: string;
  username: string;
  email: string;
  role: 'superAdmin' | 'admin' | 'person';
}

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([
    { userID: 'U001', username: 'user001', email: 'yourname@gmail.com', role: 'person' },
    { userID: 'U002', username: 'user002', email: 'yourname@gmail.com', role: 'person' },
    { userID: 'U003', username: 'user003', email: 'yourname@gmail.com', role: 'admin' },
    { userID: 'U004', username: 'user004', email: 'yourname@gmail.com', role: 'person' },
    { userID: 'U005', username: 'user005', email: 'yourname@gmail.com', role: 'person' },
    { userID: 'U006', username: 'user006', email: 'yourname@gmail.com', role: 'admin' },
    { userID: 'U007', username: 'user007', email: 'yourname@gmail.com', role: 'person' },
    { userID: 'U008', username: 'user008', email: 'yourname@gmail.com', role: 'person' },
    { userID: 'U009', username: 'user009', email: 'yourname@gmail.com', role: 'person' },
    { userID: 'U010', username: 'user010', email: 'yourname@gmail.com', role: 'admin' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleUpdateUser = (updatedUser: User) => {
    const updatedUsers = users.map((user) =>
      user.userID === updatedUser.userID ? updatedUser : user
    );
    setUsers(updatedUsers);
    handleCloseModal();
  };

  const handleDeleteUser = (userID: string) => {
    const updatedUsers = users.filter(user => user.userID !== userID);
    setUsers(updatedUsers);
    // Adjust page if needed after deletion
    if ((currentPage - 1) * usersPerPage >= updatedUsers.length && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex min-h-screen font-sans">
      <Navbar />
      <div className='flex-1 flex flex-col'>
        <TopNavbar />
        <div className="flex-1 p-8 bg-[#FAF9F8] overflow-auto">
          <div className="flex items-center justify-between mt-8 mb-8">
            <h1 className="text-[24px] font-bold">Manage Users ({users.length})</h1>
            <div className="flex gap-4 w-full max-w-[300px] justify-end">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search here"
                  className="w-full pl-10 py-2 border rounded-[13px] bg-white hover:bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#C84B2F]"
                />
                <HiMiniMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C84B2F]" />
              </div>
              <Button variant="outline" className="flex items-center gap-2 bg-[#FFFFFF] hover:bg-[#F7F7F7] font-semibold focus:outline-none focus:ring-2 focus:ring-[#C84B2F]">
                <HiBarsArrowDown size={20} /> Filter
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
                {currentUsers.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">{user.userID}</TableCell>
                    <TableCell className="text-center">{user.username}</TableCell>
                    <TableCell className="text-center">{user.email}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={user.role === 'admin' ? 'success' : 'default'}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex gap-2 justify-center">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-[#C84B2F] hover:bg-[#C63F21]/10 focus:ring-2 focus:ring-[#C63F21]"
                        onClick={() => handleEditClick(user)}
                      >
                        <FiEdit2 size={18} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-[#C84B2F] hover:bg-[#C63F21]/10 focus:ring-2 focus:ring-[#C63F21]"
                        onClick={() => handleDeleteUser(user.userID)}
                      >
                        <FiTrash2 size={18} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center items-center gap-4 flex-wrap text-center">
            <div className="text-sm text-gray-600 whitespace-nowrap">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <Pagination>
                <PaginationContent className="flex items-center gap-2">
                  <PaginationItem>
                    <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, index) => (
                    <PaginationItem key={index}>
                     <button
                        className={`w-9 h-9 rounded-xl text-sm transition-colors duration-300 ${
                          currentPage === index + 1
                            ? 'bg-[#C84B2F] text-white'
                            : 'text-black hover:bg-[#C84B2F]/20 hover:text-black'
                        }`}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </PaginationItem>
                    ))}
                  <PaginationItem>
                <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
        </div>
      </div>

      {/* Popup Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-8">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg sm:max-w-xl relative">
            <EditUser user={selectedUser} onUpdateUser={handleUpdateUser} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
