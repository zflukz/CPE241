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
import { useEffect } from 'react';
interface User {
  userID: string;
  username: string;
  email: string;
  password: string;
  role: 'superAdmin' | 'admin' | 'person';
}

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([
    
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const totalPages = Math.ceil(users.length / rowsPerPage);

  const paginatedUsers = users.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
   useEffect(() => {
      const fetchAirports = async () => {
        try {
          const response = await fetch("http://localhost:8000/api/users/users");
          if (!response.ok) throw new Error("Failed to fetch airports");
          const data: User[] = await response.json();
          const user = data.map((item: User): User => ({
            userID: item.userID,
            username: item.username,
            email :item.email,
            password : item.password,
            role : item.role
          }));
          // console.log("AirportOption",airportOptions);
          setUsers(user);
          // console.log(airports);
          
        } catch (err) {
          alert(err instanceof Error ? err.message : "Unknown error");
        } 
      };
      fetchAirports();
      // console.log("Airport",airports);
    }, []);
  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleUpdateUser = async (updatedUser: User | null) => {
  if (!updatedUser) return handleCloseModal();
console.log(updatedUser);
  try {
    const response = await fetch(`http://localhost:8000/api/users/users/edit/${updatedUser.userID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser),
    });

    if (!response.ok) throw new Error('Failed to update user');

    // Update local state
    const newUsers = users.map((u) =>
      u.userID === updatedUser.userID ? updatedUser : u
    );
    setUsers(newUsers);
    handleCloseModal();
  } catch (err) {
    alert(err instanceof Error ? err.message : 'Unknown error');
  }
};


  const handleDeleteUser = (userID: string) => {
    const updatedUsers = users.filter(user => user.userID !== userID);
    setUsers(updatedUsers);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page
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
                {paginatedUsers.map((user, index) => (
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

          <div className="flex items-center justify-between mt-6 flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Rows per page:</span>
              <select
                className="border rounded-md px-2 py-1"
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
              >
                {[5, 7, 10, 15].map((count) => (
                  <option key={count} value={count}>{count}</option>
                ))}
              </select>
            </div>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={handlePreviousPage}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                <PaginationItem className="text-sm px-4 flex items-center">
                  Page {currentPage} of {totalPages}
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={handleNextPage}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>

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
