"use client";
import React, { useEffect, useState } from "react";
import { Search, UserPlus, Upload, Pencil, Trash2 } from "lucide-react";
import initialUsers from "./userData/page"; // Pastikan jalur import benar
import AddUserModal from "./addUserModal/page"; // Pastikan jalur import benar
import ImportUserModal from "./importUsersModal/page"; // Pastikan jalur import benar
import EditUserModal from "./editUserModal/page"; // Pastikan jalur import benar
import DeleteUserModal from "./deleteUserModal/page"; // Pastikan jalur import benar

export default function UserManagementSuperAdmin() {
  const [users, setUsers] = useState([]); // Mulai dengan state kosong
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const [isImportUserModalOpen, setImportUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [isDeleteUserModalOpen, setDeleteUserModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    // Mengisi state dengan data dari initialUsers setelah komponen dimount
    setUsers(initialUsers);
  }, []); // Hanya dijalankan sekali saat komponen dimount

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAddUserModal = () => setAddUserModalOpen(true);
  const handleCloseAddUserModal = () => setAddUserModalOpen(false);
  const handleOpenImportUserModal = () => setImportUserModalOpen(true);
  const handleCloseImportUserModal = () => setImportUserModalOpen(false);

  // Open Edit User Modal
  const handleOpenEditUserModal = (user) => {
    setUserToEdit(user);
    setEditUserModalOpen(true);
  };
  const handleCloseEditUserModal = () => {
    setEditUserModalOpen(false);
    setUserToEdit(null);
  };

  // Open Delete User Modal
  const handleOpenDeleteUserModal = (user) => {
    setUserToDelete(user);
    setDeleteUserModalOpen(true);
  };
  const handleCloseDeleteUserModal = () => {
    setDeleteUserModalOpen(false);
    setUserToDelete(null);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-gray-300 pb-2">
        User Management
      </h1>

      <div className="mb-6 flex justify-between items-center">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleOpenAddUserModal}
            className="px-4 py-2 bg-blue-600 text-gray-100 rounded-md hover:bg-blue-700 transition duration-300 flex items-center"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </button>
          <button
            onClick={handleOpenImportUserModal}
            className="px-4 py-2 bg-green-600 text-gray-100 rounded-md hover:bg-green-700 transition duration-300 flex items-center"
          >
            <Upload className="mr-2 h-4 w-4" />
            Import Users
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {user.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {user.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleOpenEditUserModal(user)}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleOpenDeleteUserModal(user)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Render modals */}
      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={handleCloseAddUserModal}
      />
      <ImportUserModal
        isOpen={isImportUserModalOpen}
        onClose={handleCloseImportUserModal}
      />
      <EditUserModal
        isOpen={isEditUserModalOpen}
        onClose={handleCloseEditUserModal}
        user={userToEdit}
      />
      <DeleteUserModal
        isOpen={isDeleteUserModalOpen}
        onClose={handleCloseDeleteUserModal}
        userId={userToDelete ? userToDelete.id : null}
        onDelete={handleDeleteUser}
      />
    </div>
  );
}
