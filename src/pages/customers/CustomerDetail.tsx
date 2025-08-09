import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';
import { getCustomerById, getContractsByCustomerId } from '@/utils/mockData';
import { formatDate } from '@/utils/dateUtils';
import { ArrowLeft, Building2, Mail, MapPin, Phone, Plus, Trash2, Edit, FileText } from 'lucide-react';
import ContractCard from '@/components/contracts/ContractCard';
import { saveToLocalStorage, getFromLocalStorage } from '@/services/customerService';

const CustomerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Get customer data from mock
  const customer = getCustomerById(id || '');
  const contracts = getContractsByCustomerId(id || '');
  
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

  const handleEdit = () => {
    navigate(`/customers/${id}/edit`);
  };

  const handleDelete = () => {
    const customers = getFromLocalStorage();
    const updatedCustomers = customers.filter((c: any) => c.id !== id);
    saveToLocalStorage(updatedCustomers);
    
    // Here you would typically call your API to delete the customer
    toast.success('Xóa khách hàng thành công');
    navigate('/customers');
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => navigate('/customers')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">{customer.name}</h1>
          <StatusBadge variant={customer.status as any} className="ml-2" />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Chỉnh sửa
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Xóa
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
                <AlertDialogDescription>
                  Hành động này không thể hoàn tác. Khách hàng này sẽ bị xóa vĩnh viễn
                  khỏi hệ thống cùng với tất cả thông tin liên quan.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Xóa
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="contracts">
            Hợp đồng ({contracts.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Thông tin khách hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Mã khách hàng</p>
                    <p className="font-medium">{customer.code || '-'}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Mã số thuế</p>
                    <p className="font-medium">{customer.taxcode || '-'}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Tên khách hàng</p>
                    <p className="font-medium">{customer.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p className="font-medium">{customer.email}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Số điện thoại</p>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p className="font-medium">{customer.phone}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Công ty</p>
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p className="font-medium">{customer.company || '-'}</p>
                    </div>
                  </div>
                  
                  {customer.address && (
                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground">Địa chỉ</p>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <p className="font-medium">{customer.address}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {customer.notes && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Ghi chú</p>
                    <p>{customer.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Tổng quan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Trạng thái</p>
                  <StatusBadge variant={customer.status as any} className="mt-1" />
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Ngày tạo</p>
                  <p className="font-medium">{formatDate(customer.createdAt)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Lần cập nhật cuối</p>
                  <p className="font-medium">{formatDate(customer.updatedAt)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Số hợp đồng</p>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p className="font-medium">{contracts.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="contracts">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Danh sách hợp đồng</h2>
            <Button 
              onClick={() => navigate(`/contracts/new?customerId=${id}`)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm hợp đồng
            </Button>
          </div>
          
          {contracts.length === 0 ? (
            <Card>
              <CardContent className="text-center p-10">
                <FileText className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium">Không có hợp đồng nào</h3>
                <p className="text-muted-foreground mt-2">
                  Khách hàng này chưa có hợp đồng nào
                </p>
                <Button 
                  className="mt-4" 
                  onClick={() => navigate(`/contracts/new?customerId=${id}`)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm hợp đồng
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {contracts.map((contract) => (
                <ContractCard key={contract.id} contract={contract} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default CustomerDetail;
