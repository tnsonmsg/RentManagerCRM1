
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ContractForm from '@/components/contracts/ContractForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { getContractById } from '@/utils/mockData';

const ContractEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Get contract data from mock
  const contract = getContractById(id || '');

  if (!contract) {
    return (
      <Layout>
        <div className="text-center p-10">
          <h3 className="text-lg font-medium">Không tìm thấy hợp đồng</h3>
          <Button 
            className="mt-4" 
            onClick={() => navigate('/contracts')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại danh sách
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex items-center gap-2 mb-6">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate(`/contracts/${id}`)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Chỉnh sửa hợp đồng</h1>
      </div>
      
      <ContractForm contract={contract} isEditing={true} />
    </Layout>
  );
};

export default ContractEdit;
