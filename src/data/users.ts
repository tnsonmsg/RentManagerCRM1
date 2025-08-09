
import { User } from "@/types/user";
import { v4 as uuidv4 } from "uuid";

export const users: User[] = [
  {
    id: uuidv4(),
    name: "Admin User",
    email: "admin@example.com",
    avatar: "/avatars/admin.png",
    role: "admin",
    status: "active",
    lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    taxId: "0123456789"
  },
  {
    id: uuidv4(),
    name: "Manager User",
    email: "manager@example.com",
    avatar: "/avatars/manager.png",
    role: "manager",
    status: "active",
    lastLogin: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
    taxId: "9876543210"
  },
  {
    id: uuidv4(),
    name: "Basic User",
    email: "user@example.com",
    role: "user",
    status: "active",
    lastLogin: new Date(),
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    taxId: "5678901234"
  },
  {
    id: uuidv4(),
    name: "Inactive User",
    email: "inactive@example.com",
    role: "user",
    status: "inactive",
    lastLogin: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
  },
  {
    id: uuidv4(),
    name: "New User",
    email: "new@example.com",
    role: "user",
    status: "active",
    lastLogin: null,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: uuidv4(),
    name: "Demo User",
    email: "demo@gmail.com",
    role: "user",
    status: "active",
    lastLogin: null,
    createdAt: new Date(), // Created today
    taxId: "1122334455"
  }
];
