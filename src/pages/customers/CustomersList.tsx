
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import CustomerTable from '@/components/customers/CustomerTable';
import CustomerCard from '@/components/customers/CustomerCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockCustomers } from '@/utils/mockData';
import { Grid, List, Plus, Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CustomersList: React.FC = () => {
  const navigate = useNavigate();
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter customers based on search term and status
  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.company && customer.company.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = 
      statusFilter === 'all' || customer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Danh sách khách hàng</h1>
        <Button 
          className="flex items-center gap-2" 
          onClick={() => navigate('/customers/new')}
        >
          <Plus className="h-4 w-4" />
          Thêm khách hàng
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Tìm kiếm theo tên, email, công ty..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Lọc theo trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="active">Đang hoạt động</SelectItem>
              <SelectItem value="inactive">Không hoạt động</SelectItem>
              <SelectItem value="lead">Tiềm năng</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-md">
            <Button
              variant={viewType === 'grid' ? 'default' : 'ghost'}
              size="icon"
              className="rounded-l-md rounded-r-none"
              onClick={() => setViewType('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewType === 'list' ? 'default' : 'ghost'}
              size="icon"
              className="rounded-r-md rounded-l-none"
              onClick={() => setViewType('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {filteredCustomers.length === 0 ? (
        <div className="text-center p-10 bg-muted/20 rounded-lg">
          <h3 className="text-lg font-medium">Không tìm thấy khách hàng</h3>
          <p className="text-muted-foreground mt-2">
            Thử tìm kiếm với từ khóa khác hoặc thêm khách hàng mới
          </p>
          <Button 
            className="mt-4" 
            onClick={() => navigate('/customers/new')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm khách hàng
          </Button>
        </div>
      ) : viewType === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <CustomerCard key={customer.id} customer={customer} />
          ))}
        </div>
      ) : (
        <CustomerTable customers={filteredCustomers} />
      )}
    </Layout>
  );
};

export default CustomersList;
