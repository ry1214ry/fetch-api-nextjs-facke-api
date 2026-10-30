"use client";

import type { User } from "@/types/user";

interface Props {
  users: User[];
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UsersTable({ users, onView, onEdit, onDelete }: Props) {
  return (
    <div className="users-panel">
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>#{user.id}</td>

                <td>
                  {user.name.firstname} {user.name.lastname}
                </td>

                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.address.city}</td>

                <td>
                  <div className="action-buttons">
                    <button className="btn-view" onClick={() => onView(user)}>
                      View
                    </button>

                    <button className="btn-edit" onClick={() => onEdit(user)}>
                      Edit
                    </button>

                    <button
                      className="btn-danger"
                      onClick={() => onDelete(user)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan={6}>No users available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
