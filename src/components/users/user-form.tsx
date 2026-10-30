"use client";

import { useState } from "react";
import type { User, UserFormValues } from "@/types/user";

interface Props {
  user?: User | null;
  onSubmit: (data: UserFormValues) => Promise<void>;
  onCancel: () => void;
}

export function UserForm({ user, onSubmit, onCancel }: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<UserFormValues>({
    email: user?.email ?? "",
    username: user?.username ?? "",
    password: "",
    firstname: user?.name.firstname ?? "",
    lastname: user?.name.lastname ?? "",
    city: user?.address.city ?? "",
    street: user?.address.street ?? "",
    number: user?.address.number ?? 1,
    zipcode: user?.address.zipcode ?? "",
    phone: user?.phone ?? "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "number" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit(form);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay">
      <form className="user-form" onSubmit={handleSubmit}>
        <h2>{user ? "Edit User" : "Create User"}</h2>

        <div className="form-grid">
          <input
            name="firstname"
            placeholder="First name"
            value={form.firstname}
            onChange={handleChange}
            required
          />

          <input
            name="lastname"
            placeholder="Last name"
            value={form.lastname}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder={user ? "New password (optional)" : "Password"}
            value={form.password ?? ""}
            onChange={handleChange}
            required={!user}
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
          />

          <input
            name="street"
            placeholder="Street"
            value={form.street}
            onChange={handleChange}
            required
          />

          <input
            name="number"
            type="number"
            placeholder="House number"
            value={form.number}
            onChange={handleChange}
            required
          />

          <input
            name="zipcode"
            placeholder="Zip code"
            value={form.zipcode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Saving..." : user ? "Update User" : "Create User"}
          </button>
        </div>
      </form>
    </div>
  );
}
