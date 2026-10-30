"use client";

import type { User } from "@/types/user";

interface Props {
  user: User;
  onClose: () => void;
}

export function UserDetails({ user, onClose }: Props) {
  return (
    <div className="modal-overlay">
      <div className="user-form">
        <h2>User Details</h2>

        <div className="details-list">
          <p>
            <strong>ID:</strong> {user.id}
          </p>
          <p>
            <strong>Name:</strong> {user.name.firstname} {user.name.lastname}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>City:</strong> {user.address.city}
          </p>
          <p>
            <strong>Street:</strong> {user.address.street}
          </p>
          <p>
            <strong>House number:</strong> {user.address.number}
          </p>
          <p>
            <strong>Zip code:</strong> {user.address.zipcode}
          </p>
        </div>

        <button className="btn-primary" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
