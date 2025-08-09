
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
import { Contract } from "@/types";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency, formatDate } from "@/utils/dateUtils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SortConfig, SortDirection } from "@/types";
import { mockCustomers } from "@/utils/mockData";
import { DataTablePagination } from "@/components/ui/data-table/pagination";
import { ColumnDef, ColumnVisibility } from "@/components/ui/data-table/column-visibility";

interface ContractTableProps {
  contracts: Contract[];
}

const ContractTable: React.FC<ContractTableProps> = ({ contracts }) => {
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "startDate",
    direction: "desc",
  });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "title", "customer", "type", "value", "startDate", "status", "actions"
  ]);

  // Define columns
  const columns: ColumnDef[] = [
    { 
      id: "title", 
      header: "Tên hợp đồng",
      enableHiding: false // Cannot hide title column
    },
    { 
      id: "customer", 
      header: "Khách hàng"
    },
    { 
      id: "type", 
      header: "Loại"
    },
    { 
      id: "value", 
      header: "Giá trị"
    },
    { 
      id: "startDate", 
      header: "Ngày bắt đầu"
    },
    { 
      id: "status", 
      header: "Trạng thái"
    },
    { 
      id: "actions", 
      header: "Thao tác",
      enableHiding: false // Cannot hide actions column
    },
  ];

  // Handle row click
  const handleRowClick = (id: string) => {
    navigate(`/contracts/${id}`);
  };

  // Handle sorting
  const requestSort = (key: string) => {
    let direction: SortDirection = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Sort contracts
  const sortedContracts = [...contracts].sort((a, b) => {
    if (a[sortConfig.key as keyof Contract] < b[sortConfig.key as keyof Contract]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key as keyof Contract] > b[sortConfig.key as keyof Contract]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Calculate pagination
  const totalItems = sortedContracts.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const start = (currentPage - 1) * pageSize;
  const paginatedData = sortedContracts.slice(start, start + pageSize);

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

  // Get customer name by ID
  const getCustomerName = (customerId: string) => {
    const customer = mockCustomers.find((c) => c.id === customerId);
    return customer ? customer.name : "Unknown";
  };

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
              {isColumnVisible("title") && (
                <TableHead
                  className="cursor-pointer"
                  onClick={() => requestSort("title")}
                >
                  <span className="flex items-center">
                    Tên hợp đồng {renderSortIndicator("title")}
                  </span>
                </TableHead>
              )}
              
              {isColumnVisible("customer") && (
                <TableHead>Khách hàng</TableHead>
              )}
              
              {isColumnVisible("type") && (
                <TableHead>Loại</TableHead>
              )}
              
              {isColumnVisible("value") && (
                <TableHead
                  className="cursor-pointer"
                  onClick={() => requestSort("value")}
                >
                  <span className="flex items-center">
                    Giá trị {renderSortIndicator("value")}
                  </span>
                </TableHead>
              )}
              
              {isColumnVisible("startDate") && (
                <TableHead
                  className="cursor-pointer"
                  onClick={() => requestSort("startDate")}
                >
                  <span className="flex items-center">
                    Ngày bắt đầu {renderSortIndicator("startDate")}
                  </span>
                </TableHead>
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
              
              {isColumnVisible("actions") && (
                <TableHead>Thao tác</TableHead>
              )}
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {paginatedData.map((contract) => (
              <TableRow
                key={contract.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleRowClick(contract.id)}
              >
                {isColumnVisible("title") && (
                  <TableCell className="font-medium">{contract.title}</TableCell>
                )}
                
                {isColumnVisible("customer") && (
                  <TableCell>{getCustomerName(contract.customerId)}</TableCell>
                )}
                
                {isColumnVisible("type") && (
                  <TableCell>{getContractTypeText(contract.type)}</TableCell>
                )}
                
                {isColumnVisible("value") && (
                  <TableCell>{formatCurrency(contract.value)}</TableCell>
                )}
                
                {isColumnVisible("startDate") && (
                  <TableCell>{formatDate(contract.startDate)}</TableCell>
                )}
                
                {isColumnVisible("status") && (
                  <TableCell>
                    <StatusBadge variant={contract.status as any} />
                  </TableCell>
                )}
                
                {isColumnVisible("actions") && (
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/contracts/${contract.id}`);
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

export default ContractTable;
