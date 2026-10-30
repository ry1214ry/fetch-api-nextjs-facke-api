
import type { User, UserFormValues } from "@/types/user";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://fakestoreapi.com";

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

// READ ALL
export async function getUsers(): Promise<User[]> {
  return request<User[]>("/users");
}

// READ ONE
export async function getUserById(
  id: number
): Promise<User> {
  return request<User>(`/users/${id}`);
}

// CREATE
export async function createUser(
  data: UserFormValues
): Promise<User> {
  const payload = {
    email: data.email,
    username: data.username,
    password: data.password,
    name: {
      firstname: data.firstname,
      lastname: data.lastname,
    },
    address: {
      city: data.city,
      street: data.street,
      number: data.number,
      zipcode: data.zipcode,
      geolocation: {
        lat: "0",
        long: "0",
      },
    },
    phone: data.phone,
  };

  return request<User>("/users", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// UPDATE
export async function updateUser(
  id: number,
  data: UserFormValues
): Promise<User> {
  const payload = {
    email: data.email,
    username: data.username,
    ...(data.password
      ? { password: data.password }
      : {}),
    name: {
      firstname: data.firstname,
      lastname: data.lastname,
    },
    address: {
      city: data.city,
      street: data.street,
      number: data.number,
      zipcode: data.zipcode,
      geolocation: {
        lat: "0",
        long: "0",
      },
    },
    phone: data.phone,
  };

  return request<User>(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

// DELETE
export async function deleteUser(
  id: number
): Promise<User> {
  return request<User>(`/users/${id}`, {
    method: "DELETE",
  });
}
