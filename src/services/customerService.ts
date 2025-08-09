import { CustomerApiRequest } from '@/types/customer';

const API_BaseURL = 'https://seventoursvietnam.com/';
const API_Add_URL = API_BaseURL + 'rest-api/api/addcustomer.php';
const API_Edit_URL = API_BaseURL + 'rest-api/api/editcustomer.php';

export const saveCustomer = async (data: CustomerApiRequest) => {
  const response = await fetch(API_Add_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updateCustomer = async (data: CustomerApiRequest) => {
    const response = await fetch(API_Edit_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  };

export const saveToLocalStorage = (customers: any[]) => {
  localStorage.setItem('CustomerData', JSON.stringify(customers));
};

export const getFromLocalStorage = () => {
  const data = localStorage.getItem('CustomerData');
  return data ? JSON.parse(data) : [];
};
