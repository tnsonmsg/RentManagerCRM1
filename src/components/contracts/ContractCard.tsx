
import React from "react";
import { Link } from "react-router-dom";
import { Contract } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency, formatDate } from "@/utils/dateUtils";
import { Calendar, Clock, FileText } from "lucide-react";
import { mockCustomers } from "@/utils/mockData";

interface ContractCardProps {
  contract: Contract;
}

const ContractCard: React.FC<ContractCardProps> = ({ contract }) => {
  // Get customer name
  const customer = mockCustomers.find((c) => c.id === contract.customerId);

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

  return (
    <Link to={`/contracts/${contract.id}`}>
      <Card className="card-hover">
        <CardContent className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{contract.title}</h3>
              <div className="text-sm text-muted-foreground mt-1">
                <span className="inline-flex items-center">
                  <FileText className="h-3.5 w-3.5 mr-1" />
                  {getContractTypeText(contract.type)}
                </span>
              </div>
            </div>
            <StatusBadge variant={contract.status as any} />
          </div>

          <div className="mt-4">
            <p className="text-muted-foreground text-sm mb-1">Khách hàng:</p>
            <p className="font-medium">{customer?.name || "Unknown"}</p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Giá trị:</p>
              <p className="font-medium text-crm-700">
                {formatCurrency(contract.value)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-1">Ngày bắt đầu:</p>
              <p className="font-medium flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                {formatDate(contract.startDate)}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border flex justify-between items-center">
            <span className="text-xs flex items-center text-muted-foreground">
              <Clock className="h-3.5 w-3.5 mr-1" />
              Tạo ngày {formatDate(contract.createdAt)}
            </span>
            {contract.endDate && (
              <span className="text-xs font-medium">
                Kết thúc: {formatDate(contract.endDate)}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ContractCard;
