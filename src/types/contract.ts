export interface ContractApiRequest {
  ContractID?: string; // Optional for new contracts
  ContractCode?: string; // Optional, auto-generated if not provided
  ContractName: string; // Required
  CustomerID: string; // Required, customer ID must exist
  ContractType: 'product' | 'service' | 'subscription'; // Required
  ContractAmount: number; // Required, must be a positive number
  ContractStatus: 'draft' | 'active' | 'completed' | 'cancelled'; // Required
  ContractStartDate: string; // Required, ISO date string
  ContractExp?: string; // Optional, ISO date string
  ContractSignDate?: string; // Optional, ISO date string
  ContractNote?: string; // Optional, additional notes
  ContractCreateDate?: string; // Optional, ISO date string
  ContractCreateBy?: string; // Optional, user ID or name of creator
  // ContractUpdateDate?: string; // Optional, ISO date string for updates
  // ContractUpdateBy?: string; // Optional, user ID or name of updater
  // ContractAttachments?: string[]; // Optional, array of attachment URLs or IDs
  // ContractTags?: string[]; // Optional, array of tags for categorization
  //ContractRelatedEntities?: string[]; // Optional, related entity IDs (e.g., linked customers, products)
  //ContractCustomFields?: Record<string, any>; // Optional, custom fields for flexibility
}
