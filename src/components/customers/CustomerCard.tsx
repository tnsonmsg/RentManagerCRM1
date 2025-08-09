import React from "react";
import { Link } from "react-router-dom";
import { Customer } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateRelative } from "@/utils/dateUtils";
import { StatusBadge } from "@/components/ui/status-badge";
import { Building2, Mail, Phone } from "lucide-react";
import { mockContracts } from "@/utils/mockData";

interface CustomerCardProps {
  customer: Customer;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer }) => {
  return (
    <Link to={`/customers/${customer.id}`}>
      <Card className="card-hover">
        <CardContent className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{customer.name}</h3>
              {customer.company && (
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Building2 className="h-3.5 w-3.5 mr-1" />
                  <span>{customer.company}</span>
                </div>
              )}
              {customer.code && (
                <div className="text-sm text-muted-foreground mt-1">
                  <span className="font-medium">Mã KH:</span> {customer.code}
                </div>
              )}
              {customer.taxcode && (
                <div className="text-sm text-muted-foreground mt-1">
                  <span className="font-medium">MST:</span> {customer.taxcode}
                </div>
              )}
            </div>
            <StatusBadge variant={customer.status as any} />
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm">
              <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
              <span>{customer.email}</span>
            </div>
            <div className="flex items-center text-sm">
              <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
              <span>{customer.phone}</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border flex justify-between items-center">
            <span className="text-xs text-muted-foreground">
              Cập nhật {formatDateRelative(customer.updatedAt)}
            </span>
            <span className="text-xs font-medium text-crm-600">
              {mockContracts.filter(c => c.customerId === customer.id).length} hợp đồng
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CustomerCard;
