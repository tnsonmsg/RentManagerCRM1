
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ContractTable from '@/components/contracts/ContractTable';
import ContractCard from '@/components/contracts/ContractCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockContracts } from '@/utils/mockData';
import { Grid, List, Plus, Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ContractsList: React.FC = () => {
  const navigate = useNavigate();
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Filter contracts based on search term and status
  const filteredContracts = mockContracts.filter(contract => {
    const matchesSearch = 
      contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contract.description && contract.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = 
      statusFilter === 'all' || contract.status === statusFilter;
    
    const matchesType = 
      typeFilter === 'all' || contract.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Danh sách hợp đồng</h1>
        <Button 
          className="flex items-center gap-2" 
          onClick={() => navigate('/contracts/new')}
        >
          <Plus className="h-4 w-4" />
          Thêm hợp đồng
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Tìm kiếm theo tên hợp đồng..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-4 flex-wrap">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Lọc theo trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="draft">Bản nháp</SelectItem>
              <SelectItem value="active">Đang hoạt động</SelectItem>
              <SelectItem value="completed">Hoàn thành</SelectItem>
              <SelectItem value="cancelled">Đã hủy</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Lọc theo loại" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả loại</SelectItem>
              <SelectItem value="service">Dịch vụ</SelectItem>
              <SelectItem value="product">Sản phẩm</SelectItem>
              <SelectItem value="subscription">Thuê bao</SelectItem>
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

      {filteredContracts.length === 0 ? (
        <div className="text-center p-10 bg-muted/20 rounded-lg">
          <h3 className="text-lg font-medium">Không tìm thấy hợp đồng</h3>
          <p className="text-muted-foreground mt-2">
            Thử tìm kiếm với từ khóa khác hoặc thêm hợp đồng mới
          </p>
          <Button 
            className="mt-4" 
            onClick={() => navigate('/contracts/new')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm hợp đồng
          </Button>
        </div>
      ) : viewType === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContracts.map((contract) => (
            <ContractCard key={contract.id} contract={contract} />
          ))}
        </div>
      ) : (
        <ContractTable contracts={filteredContracts} />
      )}
    </Layout>
  );
};

export default ContractsList;
