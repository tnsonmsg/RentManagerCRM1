import { Contract } from '@/types';
import { ContractApiRequest } from '@/types/contract';
import { v4 as uuidv4 } from 'uuid';

const API_BaseURL = 'https://seventoursvietnam.com/';
const API_Edit_URL = API_BaseURL + 'rest-api/api/editcontract.php';
const API_ADD_URL =  API_BaseURL + 'rest-api/api/addcontract.php';



const transformToApiContract = (contract: Contract): ContractApiRequest => ({
  ContractID: contract.id,
  ContractCode: contract.code || `CT${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
  ContractName: contract.title,
  CustomerID: contract.customerId,
  ContractType: contract.type,
  ContractAmount: contract.value,
  ContractStatus: contract.status,
  ContractStartDate: new Date(contract.startDate).toISOString(),
  ContractExp: contract.endDate ? new Date(contract.endDate).toISOString() : '',
  ContractSignDate: new Date().toISOString(),
  ContractNote: contract.description || '',
  ContractCreateDate: new Date().toISOString(),
  ContractCreateBy: 'System'
});

export const saveContract = async (contract: Contract): Promise<any> => {
  const apiContract = transformToApiContract(contract);
  
  try {
    const response = await fetch(API_ADD_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiContract),
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error saving contract:', error);
    throw error;
  }
};


export const updateContract = async (contract: Contract): Promise<any> => {
    const apiContract = transformToApiContract(contract);
    
    try {
      const response = await fetch(API_Edit_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiContract),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error saving contract:', error);
      throw error;
    }
  };

export const saveContractToLocalStorage = (contract: Contract) => {
  try {
    const contracts = getContractsFromLocalStorage();
    const updatedContracts = [...contracts];
    
    const existingIndex = contracts.findIndex(c => c.id === contract.id);
    if (existingIndex >= 0) {
      updatedContracts[existingIndex] = contract;
    } else {
      updatedContracts.push(contract);
    }
    
    localStorage.setItem('contracts', JSON.stringify(updatedContracts));
    return true;
  } catch (error) {
    console.error('Error saving contract to localStorage:', error);
    return false;
  }
};

export const getContractsFromLocalStorage = (): Contract[] => {
  try {
    const contracts = localStorage.getItem('contracts');
    return contracts ? JSON.parse(contracts) : [];
  } catch (error) {
    console.error('Error reading contracts from localStorage:', error);
    return [];
  }
};