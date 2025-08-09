
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import CustomerForm from '@/components/customers/CustomerForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { getCustomerById } from '@/utils/mockData';

const CustomerEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Get customer data from mock
  const customer = getCustomerById(id || '');

  if (!customer) {
    return (
      <Layout>
        <div className="text-center p-10">
          <h3 className="text-lg font-medium">Không tìm thấy khách hàng</h3>
          <Button 
            className="mt-4" 
            onClick={() => navigate('/customers')}
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
          onClick={() => navigate(`/customers/${id}`)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Chỉnh sửa khách hàng</h1>
      </div>
      
      <CustomerForm customer={customer} isEditing={true} />
    </Layout>
  );
};

export default CustomerEdit;
