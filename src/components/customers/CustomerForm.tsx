
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Customer } from "@/types";
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
import { saveCustomer, saveToLocalStorage, updateCustomer } from "@/services/customerService";
import { CustomerApiRequest } from "@/types/customer";

interface CustomerFormProps {
  customer?: Customer;
  isEditing?: boolean;
}

const initialCustomer: Omit<Customer, "id" | "createdAt" | "updatedAt"> = {
  name: "",
  code: `KH-${Math.floor(Math.random() * 10000)}`, // Generate a random code
  // Default code format for new customers
  email: "",
  phone: "",
  company: "",
  taxcode: "", // Optional tax identification number

  address: "",
  status: "active",
  notes: "",
  taxId: "", // Added tax ID field with empty default value
};

const CustomerForm: React.FC<CustomerFormProps> = ({
  customer,
  isEditing = false,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    customer || { ...initialCustomer }
  );

  useEffect(() => {
    if (customer) {
      setFormData(customer);
    }
  }, [customer]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

  //saveToLocalStorage(customer);
  localStorage.setItem('CustomerData', JSON.stringify(customer));
    // Here you would typically send the data to your API
    // For now, we'll just show a success message and redirect
  const formDataToSave: CustomerApiRequest = {
      CustomerID: (formData as any).id || "",
      CustomerCode: formData.code || `KH-${Math.floor(Math.random() * 10000)}`, // Generate a random code if not provided
      CustomerName: formData.name,
      Email: formData.email,
      Tel: formData.phone,
     
      CustomerCompany: formData.company || "",
      TaxCode: formData.taxcode || formData.taxId || "",
      CustomerAddress: formData.address || "",
      CustomerStatus: formData.status,
      Description: formData.notes || "",
      IsSystem: false, // Assuming this is not a system customer
      InActive: formData.status === "inactive",
      IsCustomer: true, // Assuming this is a customer
      IsSupply: false, // Assuming this is not a supplier
      // Add other mappings as required by CustomerApiRequest
      District: (formData as any).district || "",
      Province: (formData as any).province || "",
      // Add any additional fields required by your API
      
    };
    // Save the customer data
    // Uncomment the following lines to save to API or localStorage
    if (isEditing) {
      updateCustomer(formDataToSave);
      //saveCustomer(formDataToSave);
    } else {
      saveCustomer(formDataToSave);
    }
    // For localStorage, you can use a service function
    // Uncomment the following line to save to localStorage
  
    // For now, we will just log the data
    console.log("Customer data to save:", formDataToSave);
    //saveCustomer(formData);
    //saveToLocalStorage(formData);
    toast.success(
      isEditing
        ? "Cập nhật khách hàng thành công"
        : "Thêm khách hàng mới thành công"
    );
    
    // Redirect back to customers list
    navigate("/customers");
  };

  const handleCancel = () => {
    navigate(isEditing ? `/customers/${customer?.id}` : "/customers");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isEditing ? "Chỉnh sửa khách hàng" : "Thêm khách hàng mới"}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">
                Tên khách hàng <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                Điện thoại <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxId">
                Mã số thuế
              </Label>
              <Input
                id="taxId"
                name="taxId"
                value={formData.taxId || ""}
                onChange={handleChange}
                placeholder="Nhập mã số thuế"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Công ty</Label>
              <Input
                id="company"
                name="company"
                value={formData.company || ""}
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
                  <SelectItem value="active">Đang hoạt động</SelectItem>
                  <SelectItem value="inactive">Không hoạt động</SelectItem>
                  <SelectItem value="lead">Tiềm năng</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Địa chỉ</Label>
            <Input
              id="address"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Ghi chú</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes || ""}
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

export default CustomerForm;
