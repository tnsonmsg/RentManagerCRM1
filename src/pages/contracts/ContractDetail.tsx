
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { 
  Card, 
  CardContent, 
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
import { getContractById, getCustomerById } from '@/utils/mockData';
import { formatCurrency, formatDate } from '@/utils/dateUtils';
import { ArrowLeft, Calendar, Trash2, Edit, User, DollarSign, FileText, Clock, Plus } from 'lucide-react';

const ContractDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Get contract data from mock
  const contract = getContractById(id || '');
  // Get customer data
  const customer = contract ? getCustomerById(contract.customerId) : undefined;
  
  if (!contract || !customer) {
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

  // Get contract type display text
  const getContractTypeText = (type: string) => {
    switch (type) {
      case "service":
        return "Dịch vụ";
      case "product":
        return "Sản phẩm";
      case "subscription":
        return "Thuê bao";
      default:
        return type;
    }
  };

  const handleEdit = () => {
    navigate(`/contracts/${id}/edit`);
  };

  const handleDelete = () => {
    // Here you would typically call your API to delete the contract
    toast.success('Xóa hợp đồng thành công');
    navigate('/contracts');
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => navigate('/contracts')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">{contract.title}</h1>
          <StatusBadge variant={contract.status as any} className="ml-2" />
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
                  Hành động này không thể hoàn tác. Hợp đồng này sẽ bị xóa vĩnh viễn
                  khỏi hệ thống.
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

      <Tabs defaultValue="details">
        <TabsList className="mb-6">
          <TabsTrigger value="details">Chi tiết hợp đồng</TabsTrigger>
          <TabsTrigger value="documents">Tài liệu</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Thông tin hợp đồng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Tên hợp đồng</p>
                    <p className="font-medium">{contract.title}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Khách hàng</p>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p className="font-medium underline cursor-pointer" onClick={() => navigate(`/customers/${customer.id}`)}>
                        {customer.name}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Loại hợp đồng</p>
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p className="font-medium">{getContractTypeText(contract.type)}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Giá trị</p>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p className="font-medium text-crm-700">{formatCurrency(contract.value)}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Ngày bắt đầu</p>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p className="font-medium">{formatDate(contract.startDate)}</p>
                    </div>
                  </div>
                  
                  {contract.endDate && (
                    <div>
                      <p className="text-sm text-muted-foreground">Ngày kết thúc</p>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <p className="font-medium">{formatDate(contract.endDate)}</p>
                      </div>
                    </div>
                  )}
                  
                  {contract.paymentTerms && (
                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground">Điều khoản thanh toán</p>
                      <p className="font-medium">{contract.paymentTerms}</p>
                    </div>
                  )}
                </div>
                
                {contract.description && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Mô tả hợp đồng</p>
                    <p>{contract.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Trạng thái</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Trạng thái hiện tại</p>
                  <StatusBadge variant={contract.status as any} className="mt-1" />
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Ngày tạo</p>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p className="font-medium">{formatDate(contract.createdAt)}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Lần cập nhật cuối</p>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p className="font-medium">{formatDate(contract.updatedAt)}</p>
                  </div>
                </div>
                
                <div className="pt-4 mt-4 border-t">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => navigate(`/customers/${customer.id}`)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Xem khách hàng
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Tài liệu hợp đồng</CardTitle>
            </CardHeader>
            <CardContent>
              {contract.documents && contract.documents.length > 0 ? (
                <div className="space-y-2">
                  {contract.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span>{doc}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        Tải xuống
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-6">
                  <FileText className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium">Không có tài liệu nào</h3>
                  <p className="text-muted-foreground mt-2">
                    Hợp đồng này chưa có tài liệu đính kèm
                  </p>
                  <Button className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm tài liệu
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default ContractDetail;
