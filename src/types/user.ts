
export type UserRole = 'admin' | 'manager' | 'user';
export type UserStatus = 'active' | 'inactive';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  lastLogin?: Date | null;
  createdAt: Date;
  taxId?: string; // Added tax identification number field
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  confirmPassword: string;
  taxId?: string; // Added tax identification number field for registration
}
