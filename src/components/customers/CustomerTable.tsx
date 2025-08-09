
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Customer } from "@/types";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatDate } from "@/utils/dateUtils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SortConfig, SortDirection } from "@/types";
import { DataTablePagination } from "@/components/ui/data-table/pagination";
import { ColumnDef, ColumnVisibility } from "@/components/ui/data-table/column-visibility";

interface CustomerTableProps {
  customers: Customer[];
}

const CustomerTable: React.FC<CustomerTableProps> = ({ customers }) => {
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "name",
    direction: "asc",
  });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "name", "email", "phone", "taxId", "company", "status", "createdAt", "actions"
  ]);

  // Define columns
  const columns: ColumnDef[] = [
    { 
      id: "name", 
      header: "Tên khách hàng",
      enableHiding: false // Không cho phép ẩn cột tên
    },
    { 
      id: "email", 
      header: "Email"
    },
    { 
      id: "phone", 
      header: "Điện thoại"
    },
    { 
      id: "taxId", 
      header: "Mã số thuế"
    },
    { 
      id: "company", 
      header: "Công ty"
    },
    { 
      id: "status", 
      header: "Trạng thái"
    },
    { 
      id: "createdAt", 
      header: "Ngày tạo"
    },
    { 
      id: "actions", 
      header: "Thao tác",
      enableHiding: false // Không cho phép ẩn cột thao tác
    },
  ];

  // Handle row click
  const handleRowClick = (id: string) => {
    navigate(`/customers/${id}`);
  };

  // Handle sorting
  const requestSort = (key: string) => {
    let direction: SortDirection = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Sort customers
  const sortedCustomers = [...customers].sort((a, b) => {
    if (a[sortConfig.key as keyof Customer] < b[sortConfig.key as keyof Customer]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key as keyof Customer] > b[sortConfig.key as keyof Customer]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Calculate pagination
  const totalItems = sortedCustomers.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const start = (currentPage - 1) * pageSize;
  const paginatedData = sortedCustomers.slice(start, start + pageSize);

  // Render sort indicator
  const renderSortIndicator = (key: string) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="h-4 w-4 ml-1 inline-block" />
    ) : (
      <ChevronDown className="h-4 w-4 ml-1 inline-block" />
    );
  };

  // Handle column visibility change
  const handleColumnVisibilityChange = (columnId: string, isVisible: boolean) => {
    if (isVisible) {
      setVisibleColumns(prev => [...prev, columnId]);
    } else {
      setVisibleColumns(prev => prev.filter(id => id !== columnId));
    }
  };

  // Handle toggle all columns
  const handleToggleAllColumns = (visible: boolean) => {
    if (visible) {
      // Show all columns except those that can't be hidden
      setVisibleColumns(columns.map(col => col.id));
    } else {
      // Hide all columns except those that can't be hidden
      setVisibleColumns(columns.filter(col => col.enableHiding === false).map(col => col.id));
    }
  };

  // Check if column is visible
  const isColumnVisible = (columnId: string) => visibleColumns.includes(columnId);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <ColumnVisibility
          columns={columns}
          visibleColumns={visibleColumns}
          onColumnVisibilityChange={handleColumnVisibilityChange}
          onToggleAllColumns={handleToggleAllColumns}
        />
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              {isColumnVisible("name") && (
                <TableHead
                  className="cursor-pointer"
                  onClick={() => requestSort("name")}
                >
                  <span className="flex items-center">
                    Tên khách hàng {renderSortIndicator("name")}
                  </span>
                </TableHead>
              )}
              
              {isColumnVisible("email") && (
                <TableHead
                  className="cursor-pointer"
                  onClick={() => requestSort("email")}
                >
                  <span className="flex items-center">
                    Email {renderSortIndicator("email")}
                  </span>
                </TableHead>
              )}
              
              {isColumnVisible("phone") && (
                <TableHead>Điện thoại</TableHead>
              )}
              
              {isColumnVisible("taxId") && (
                <TableHead>Mã số thuế</TableHead>
              )}
              
              {isColumnVisible("company") && (
                <TableHead>Công ty</TableHead>
              )}
              
              {isColumnVisible("status") && (
                <TableHead
                  className="cursor-pointer"
                  onClick={() => requestSort("status")}
                >
                  <span className="flex items-center">
                    Trạng thái {renderSortIndicator("status")}
                  </span>
                </TableHead>
              )}
              
              {isColumnVisible("createdAt") && (
                <TableHead
                  className="cursor-pointer"
                  onClick={() => requestSort("createdAt")}
                >
                  <span className="flex items-center">
                    Ngày tạo {renderSortIndicator("createdAt")}
                  </span>
                </TableHead>
              )}
              
              {isColumnVisible("actions") && (
                <TableHead>Thao tác</TableHead>
              )}
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {paginatedData.map((customer) => (
              <TableRow
                key={customer.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleRowClick(customer.id)}
              >
                {isColumnVisible("name") && (
                  <TableCell className="font-medium">{customer.name}</TableCell>
                )}
                
                {isColumnVisible("email") && (
                  <TableCell>{customer.email}</TableCell>
                )}
                
                {isColumnVisible("phone") && (
                  <TableCell>{customer.phone}</TableCell>
                )}
                
                {isColumnVisible("taxId") && (
                  <TableCell>{customer.taxId || "-"}</TableCell>
                )}
                
                {isColumnVisible("company") && (
                  <TableCell>{customer.company || "-"}</TableCell>
                )}
                
                {isColumnVisible("status") && (
                  <TableCell>
                    <StatusBadge variant={customer.status as any} />
                  </TableCell>
                )}
                
                {isColumnVisible("createdAt") && (
                  <TableCell>{formatDate(customer.createdAt)}</TableCell>
                )}
                
                {isColumnVisible("actions") && (
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/customers/${customer.id}`);
                      }}
                    >
                      Xem
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {totalPages > 0 && (
        <DataTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1); // Reset to first page when changing page size
          }}
        />
      )}
    </div>
  );
};

export default CustomerTable;
