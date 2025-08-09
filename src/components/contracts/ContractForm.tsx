import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Contract } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { mockCustomers } from "@/utils/mockData";
import { saveContract, saveContractToLocalStorage, updateContract } from "@/services/contractService";
import { ContractApiRequest } from "@/types/contract";

interface ContractFormProps {
  contract?: Contract;
  isEditing?: boolean;
  customerId?: string;
}

const initialContract: Omit<
  Contract,
  "id" | "createdAt" | "updatedAt" | "customerId"
> = {
  title: "",
  description: "",
  value: 0,
  startDate: new Date(),
  endDate: undefined,
  status: "draft",
  type: "service",
  paymentTerms: "",
  documents: [],
  code: ""
};

const ContractForm: React.FC<ContractFormProps> = ({
  contract,
  isEditing = false,
  customerId,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>(
    contract || { 
      ...initialContract, 
      customerId: customerId || "" 
    }
  );

  useEffect(() => {
    if (contract) {
      setFormData({
        ...contract,
        startDate: contract.startDate.toISOString().split("T")[0],
        endDate: contract.endDate
          ? contract.endDate.toISOString().split("T")[0]
          : "",
      });
    } else if (customerId) {
      setFormData({
        ...initialContract,
        customerId,
        startDate: new Date().toISOString().split("T")[0],
      });
    }
  }, [contract, customerId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: name === "value" ? parseFloat(value) : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.customerId || !formData.startDate) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    if (formData.value <= 0) {
      toast.error("Giá trị hợp đồng phải lớn hơn 0");
      return;
    }

    localStorage.setItem('ContractData', JSON.stringify(contract));
    // Prepare contract data
    // const contractData: ContractApiRequest = {
    //   ...formData,
      
    // };

    try {
      // Save to API
      if (isEditing) {
        await updateContract(formData);
      }
      else  {
        await saveContract(formData);
      }
      
      
      // Save to localStorage
      saveContractToLocalStorage(formData);
      
      
      toast.success(
        isEditing
          ? "Cập nhật hợp đồng thành công"
          : "Thêm hợp đồng mới thành công"
      );
      
      // Redirect back to contracts list
      navigate(customerId ? `/customers/${customerId}` : "/contracts");
    } catch (error) {
      console.error('Error saving contract:', error);
      toast.error("Có lỗi xảy ra khi lưu hợp đồng. Vui lòng thử lại sau.");
    }
  };

  const handleCancel = () => {
    navigate(
      isEditing 
        ? `/contracts/${contract?.id}` 
        : (customerId ? `/customers/${customerId}` : "/contracts")
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isEditing ? "Chỉnh sửa hợp đồng" : "Thêm hợp đồng mới"}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">
                Tên hợp đồng <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerId">
                Khách hàng <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.customerId}
                onValueChange={(value) => handleSelectChange("customerId", value)}
                disabled={!!customerId}
              >
                <SelectTrigger id="customerId">
                  <SelectValue placeholder="Chọn khách hàng" />
                </SelectTrigger>
                <SelectContent>
                  {mockCustomers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="value">
                Giá trị <span className="text-red-500">*</span>
              </Label>
              <Input
                id="value"
                name="value"
                type="number"
                min="0"
                step="1000"
                value={formData.value}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Loại hợp đồng</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Chọn loại hợp đồng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="service">Dịch vụ</SelectItem>
                  <SelectItem value="product">Sản phẩm</SelectItem>
                  <SelectItem value="subscription">Thuê bao</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">
                Ngày bắt đầu <span className="text-red-500">*</span>
              </Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">Ngày kết thúc</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate || ""}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Bản nháp</SelectItem>
                  <SelectItem value="active">Đang hoạt động</SelectItem>
                  <SelectItem value="completed">Hoàn thành</SelectItem>
                  <SelectItem value="cancelled">Đã hủy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentTerms">Điều khoản thanh toán</Label>
              <Input
                id="paymentTerms"
                name="paymentTerms"
                value={formData.paymentTerms || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              rows={4}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Hủy
          </Button>
          <Button type="submit">
            {isEditing ? "Cập nhật" : "Thêm mới"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ContractForm;
