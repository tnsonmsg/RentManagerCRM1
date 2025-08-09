export interface Customer {
  id: string;
  code?: string; // Unique code for the customer
  name: string;
  email: string;
  phone: string;
  company?: string;
  taxcode?: string; // Optional tax identification number
  address?: string;
  status: 'active' | 'inactive' | 'lead';
  notes?: string;
  taxId?: string; // Added tax identification number field for customers
  createdAt: Date;
  updatedAt: Date;
}

export interface Contract {
  id: string;
  code: string; // Unique code for the contract
  customerId: string;
  title: string;
  description?: string;
  value: number;
  startDate: Date;
  endDate?: Date;
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  type: 'service' | 'product' | 'subscription';
  paymentTerms?: string;
  documents?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardStats {
  totalCustomers: number;
  activeCustomers: number;
  totalContracts: number;
  activeContracts: number;
  totalRevenue: number;
  revenueThisMonth: number;
}

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  key: string;
  direction: SortDirection;
}
