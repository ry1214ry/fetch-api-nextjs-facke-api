"use client";

import { useEffect, useState } from "react";

import { UsersTable } from "@/components/users/users-table";
import { UserForm } from "@/components/users/user-form";
import { UserDetails } from "@/components/users/user-details";
import { DeleteUserDialog } from "@/components/users/delete-user-dialog";

import { getUsers, createUser, updateUser, deleteUser } from "@/lib/api/users";

import type { User, UserFormValues } from "@/types/user";

type ModalType = "create" | "edit" | "view" | "delete" | null;

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modal, setModal] = useState<ModalType>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // FETCH USERS
  async function fetchUsers() {
    try {
      setLoading(true);
      setError("");

      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void fetchUsers();
  }, []);

  // CREATE USER
  async function handleCreate(data: UserFormValues) {
    try {
      setSaving(true);

      const newUser = await createUser(data);

      setUsers((previous) => [...previous, newUser]);

      setModal(null);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create user");
    } finally {
      setSaving(false);
    }
  }

  // UPDATE USER
  async function handleUpdate(data: UserFormValues) {
    if (!selectedUser) return;

    try {
      setSaving(true);

      const updatedUser = await updateUser(selectedUser.id, data);

      setUsers((previous) =>
        previous.map((user) =>
          user.id === selectedUser.id
            ? { ...updatedUser, id: selectedUser.id }
            : user,
        ),
      );

      setModal(null);
      setSelectedUser(null);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update user");
    } finally {
      setSaving(false);
    }
  }

  // DELETE USER
  async function handleDelete() {
    if (!selectedUser) return;

    try {
      setSaving(true);

      await deleteUser(selectedUser.id);

      setUsers((previous) =>
        previous.filter((user) => user.id !== selectedUser.id),
      );

      setModal(null);
      setSelectedUser(null);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete user");
    } finally {
      setSaving(false);
    }
  }

  function openModal(type: ModalType, user?: User) {
    setSelectedUser(user ?? null);
    setModal(type);
    setError("");
  }

  function closeModal() {
    if (saving) return;
    setModal(null);
    setSelectedUser(null);
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">USER MANAGEMENT</p>
          <h1>Users Dashboard</h1>
          <p className="page-description">
            Manage your users using CRUD operations.
          </p>
        </div>

        <button className="btn-primary" onClick={() => openModal("create")}>
          + Create User
        </button>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <p>Total Users</p>
          <strong>{users.length}</strong>
        </div>

        <div className="stat-card">
          <p>API Source</p>
          <strong>Fake Store API</strong>
        </div>
      </div>

      {error && (
        <div className="error-message" role="alert">
          {error}
          <button onClick={() => setError("")}>Dismiss</button>
        </div>
      )}

      {loading ? (
        <div className="loading-card">Loading users...</div>
      ) : (
        <UsersTable
          users={users}
          onView={(user) => openModal("view", user)}
          onEdit={(user) => openModal("edit", user)}
          onDelete={(user) => openModal("delete", user)}
        />
      )}

      {/* CREATE */}
      {modal === "create" && (
        <UserForm onSubmit={handleCreate} onCancel={closeModal} />
      )}

      {/* UPDATE */}
      {modal === "edit" && selectedUser && (
        <UserForm
          user={selectedUser}
          onSubmit={handleUpdate}
          onCancel={closeModal}
        />
      )}

      {/* VIEW */}
      {modal === "view" && selectedUser && (
        <UserDetails user={selectedUser} onClose={closeModal} />
      )}

      {/* DELETE */}
      {modal === "delete" && selectedUser && (
        <DeleteUserDialog
          userName={`${selectedUser.name.firstname} ${selectedUser.name.lastname}`}
          loading={saving}
          onConfirm={handleDelete}
          onCancel={closeModal}
        />
      )}
    </main>
  );
}
