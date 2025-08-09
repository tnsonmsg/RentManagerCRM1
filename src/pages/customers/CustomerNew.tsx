
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import CustomerForm from '@/components/customers/CustomerForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const CustomerNew: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" onClick={() => navigate('/customers')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Thêm khách hàng mới</h1>
      </div>
      
      <CustomerForm />
    </Layout>
  );
};

export default CustomerNew;
