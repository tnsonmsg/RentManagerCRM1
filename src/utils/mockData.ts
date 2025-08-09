import { Customer, Contract, DashboardStats } from "@/types";
import { v4 as uuidv4 } from "uuid";

interface APICustomer {
  CustomerID: string;
  CustomerCode: string;
  CustomerName: string;
  CustomerAddress: string;
  District: string;
  Province: string;
  Tel: string;
  Email: string;
  Taxcode: string;
  Description: string;
  IsSystem: boolean;
  InActive: boolean;
  IsCustomer: boolean;
  IsSupply: boolean;
}

const transformApiCustomer = (apiCustomer: APICustomer): Customer => ({
  //id: apiCustomer.CustomerID,
  id: apiCustomer.CustomerID || uuidv4(),
  name: apiCustomer.CustomerName || 'Chưa có tên',
  code: apiCustomer.CustomerCode || `KH-${Math.floor(Math.random() * 10000)}`,
  taxcode: apiCustomer.Taxcode || 'Chưa có mã số thuế',
  email: apiCustomer.Email,
  phone: apiCustomer.Tel,
  address: `${apiCustomer.CustomerAddress}, ${apiCustomer.District}, ${apiCustomer.Province}`,
  status: apiCustomer.InActive ? 'inactive' : 'active',
  notes: apiCustomer.Description,
  createdAt: new Date(),
  updatedAt: new Date(),
  company: apiCustomer.CustomerName
});

// Mock customers data with localStorage/API integration
export const mockCustomers: Customer[] = (() => {
  const storageKey = 'CustomerData';
  const storedData = localStorage.getItem(storageKey);
  
  if (storedData) {
    return JSON.parse(storedData);
  }

  // Fetch from API if no localStorage data
  const fetchCustomers = async () => {
    try {
      const response = await fetch('https://seventoursvietnam.com/rest-api/api/readcustomer.php?pagenumber=1&limit=100&sortcolumn=&orderby=asc&query=&_=');
      const data = await response.json();
      const customers = data.body.map(transformApiCustomer);
      localStorage.setItem(storageKey, JSON.stringify(customers));
      return customers;
    } catch (error) {
      console.error('Failed to fetch customers:', error);
      return [];
    }
  };

  // Initialize with empty array and update after fetch
  const initialCustomers: Customer[] = [];
  fetchCustomers().then(customers => {
    initialCustomers.push(...customers);
  });

  return initialCustomers;
})();

interface APIContract {
  ContractID: string;
  ContractCode: string;
  ContractName: string;
  CustomerID: string;
  ContractType: string;
  ContractAmount: string;
  ContractStatus: string;
  ContractStartDate: string;
  ContractExp: string;
  ContractSignDate: string;
  ContractCreateDate: string;
  ContractNote: string;
  ContractCreateBy: string;
}

const transformApiContract = (apiContract: APIContract): Contract => ({
  id: apiContract.ContractID,
  code: apiContract.ContractCode,
  customerId: apiContract.CustomerID,
  title: apiContract.ContractName,
  description: apiContract.ContractNote || undefined,
  value: parseFloat(apiContract.ContractAmount) || 0,
  startDate: new Date(apiContract.ContractStartDate),
  endDate: new Date(apiContract.ContractExp),
  status: apiContract.ContractStatus === 'Đang hiệu lực' ? 'active' : 
          apiContract.ContractStatus === 'Hoàn thành' ? 'completed' : 'draft',
  type: apiContract.ContractType === 'Cung cấp' ? 'product' : 
        apiContract.ContractType === 'Dịch vụ' ? 'service' : 'subscription',
  createdAt: new Date(apiContract.ContractCreateDate),
  updatedAt: new Date(apiContract.ContractCreateDate)
});

// Mock contracts data with localStorage/API integration
export const mockContracts: Contract[] = (() => {
  const storageKey = 'ContractData';
  const storedData = localStorage.getItem(storageKey);
  
  if (storedData) {
    return JSON.parse(storedData);
  }

  // Fetch from API if no localStorage data
  const fetchContracts = async () => {
    try {
      const response = await fetch('https://seventoursvietnam.com/rest-api/api/readcontract.php?pagenumber=1&limit=100&sortcolumn=&orderby=asc&query=&_=');
      const data = await response.json();
      const contracts = data.body.map(transformApiContract);
      localStorage.setItem(storageKey, JSON.stringify(contracts));
      return contracts;
    } catch (error) {
      console.error('Failed to fetch contracts:', error);
      return [];
    }
  };

  // Initialize with empty array and update after fetch
  const initialContracts: Contract[] = [];
  fetchContracts().then(contracts => {
    initialContracts.push(...contracts);
  });

  return initialContracts;
})();

// Get customer by id
export const getCustomerById = (id: string): Customer | undefined => {
  return mockCustomers.find(customer => customer.id === id);
};

// Get contract by id
export const getContractById = (id: string): Contract | undefined => {
  return mockContracts.find(contract => contract.id === id);
};

// Get contracts by customer id
export const getContractsByCustomerId = (customerId: string): Contract[] => {
  return mockContracts.filter(contract => contract.customerId === customerId);
};

// Generate dashboard stats
export const getDashboardStats = (): DashboardStats => {
  const activeCustomers = mockCustomers.filter(c => c.status === 'active').length;
  const activeContracts = mockContracts.filter(c => c.status === 'active').length;
  
  const totalRevenue = mockContracts.reduce((sum, contract) => sum + contract.value, 0);
  
  // Calculate revenue for current month
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  const revenueThisMonth = mockContracts
    .filter(contract => {
      const contractDate = new Date(contract.createdAt);
      return contractDate.getMonth() === currentMonth && 
             contractDate.getFullYear() === currentYear;
    })
    .reduce((sum, contract) => sum + contract.value, 0);
  
  return {
    totalCustomers: mockCustomers.length,
    activeCustomers,
    totalContracts: mockContracts.length,
    activeContracts,
    totalRevenue,
    revenueThisMonth
  };
};
