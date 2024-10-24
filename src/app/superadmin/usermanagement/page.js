"use client";
import React, { useEffect, useState } from "react";
import { Search, UserPlus, Upload, Pencil, Trash2 } from "lucide-react";
import AddUserModal from "./addUserModal/page";
import ImportUserModal from "./importUsersModal/page";
import EditUserModal from "./editUserModal/page";
import DeleteUserModal from "./deleteUserModal/page";

const initialUsers = [
  {
    id: 1,
    username: "agung_surya",
    email: "agung@example.com",
    role: "Admin",
  },
  {
    id: 2,
    username: "diana_rahma",
    email: "diana@example.com",
    role: "User",
  },
  {
    id: 3,
    username: "budi_setiawan",
    email: "budi@example.com",
    role: "Moderator",
  },
  {
    id: 4,
    username: "siti_nurbaya",
    email: "siti@example.com",
    role: "Admin",
  },
  {
    id: 5,
    username: "rudi_susanto",
    email: "rudi@example.com",
    role: "User",
  },
];

export default function UserManagementSuperAdmin() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const [isImportUserModalOpen, setImportUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [isDeleteUserModalOpen, setDeleteUserModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    setUsers(initialUsers);
  }, []);

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
  const handleOpenEditUserModal = (user) => {
    setUserToEdit(user);
    setEditUserModalOpen(true);
  };
  const handleCloseEditUserModal = () => {
    setEditUserModalOpen(false);
    setUserToEdit(null);
  };
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
