
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ContractForm from '@/components/contracts/ContractForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const ContractNew: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [customerId, setCustomerId] = useState<string | undefined>(undefined);

  // Get customerId from query params if present
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('customerId');
    if (id) {
      setCustomerId(id);
    }
  }, [location.search]);

  return (
    <Layout>
      <div className="flex items-center gap-2 mb-6">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate(customerId ? `/customers/${customerId}` : '/contracts')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Thêm hợp đồng mới</h1>
      </div>
      
      <ContractForm customerId={customerId} />
    </Layout>
  );
};

export default ContractNew;
