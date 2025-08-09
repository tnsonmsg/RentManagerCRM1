export interface CustomerApiRequest {
  CustomerID: string;
  CustomerCode: string;
  CustomerName: string;
  CustomerAddress: string;
  District: string;
  Province: string;
  Tel: string;
  Email: string;
  CustomerCompany?: string;
  TaxCode: string;
  CustomerStatus: 'active' | 'inactive' | 'lead';
  Description: string;
  IsSystem: boolean;
  InActive: boolean;
  IsCustomer: boolean;
  IsSupply: boolean;
}
