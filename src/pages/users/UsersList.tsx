
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/layout/Layout";
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
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Edit, Trash2, Plus, Search } from "lucide-react";
import { formatDate } from "@/utils/dateUtils";
import { User as UserType } from "@/types/user";
import { DataTablePagination } from "@/components/ui/data-table/pagination";
import { ColumnDef, ColumnVisibility } from "@/components/ui/data-table/column-visibility";

const UsersList: React.FC = () => {
  const { getUsers } = useAuth();
  const navigate = useNavigate();
  const allUsers = getUsers();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "user", "email", "role", "status", "lastLogin", "actions"
  ]);

  // Define columns
  const columns: ColumnDef[] = [
    { id: "user", header: "Người dùng", enableHiding: false },
    { id: "email", header: "Email" },
    { id: "role", header: "Vai trò" },
    { id: "status", header: "Trạng thái" },
    { id: "lastLogin", header: "Đăng nhập lần cuối" },
    { id: "actions", header: "Thao tác", enableHiding: false },
  ];

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
      setVisibleColumns(columns.map(col => col.id));
    } else {
      setVisibleColumns(columns.filter(col => col.enableHiding === false).map(col => col.id));
    }
  };

  // Filter users based on search term
  const filteredUsers = allUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const start = (currentPage - 1) * pageSize;
  const paginatedUsers = filteredUsers.slice(start, start + pageSize);

  // Get user initials for avatar
  const getUserInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Render role badge
  const renderRoleBadge = (role: UserType["role"]) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-red-500">Quản trị viên</Badge>;
      case "manager":
        return <Badge className="bg-blue-500">Quản lý</Badge>;
      default:
        return <Badge variant="outline">Người dùng</Badge>;
    }
  };

  // Render status badge
  const renderStatusBadge = (status: UserType["status"]) => {
    return status === "active" ? (
      <Badge className="bg-green-500">Hoạt động</Badge>
    ) : (
      <Badge variant="secondary">Không hoạt động</Badge>
    );
  };

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
          <Button onClick={() => navigate("/users/new")}>
            <Plus className="mr-2 h-4 w-4" /> Thêm người dùng
          </Button>
        </div>
        
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="w-full md:w-1/3">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm người dùng..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
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
                {visibleColumns.includes("user") && (
                  <TableHead>Người dùng</TableHead>
                )}
                {visibleColumns.includes("email") && (
                  <TableHead>Email</TableHead>
                )}
                {visibleColumns.includes("role") && (
                  <TableHead>Vai trò</TableHead>
                )}
                {visibleColumns.includes("status") && (
                  <TableHead>Trạng thái</TableHead>
                )}
                {visibleColumns.includes("lastLogin") && (
                  <TableHead>Đăng nhập lần cuối</TableHead>
                )}
                {visibleColumns.includes("actions") && (
                  <TableHead className="text-right">Thao tác</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.length === 0 ? (
                <TableRow>
                  <TableCell 
                    colSpan={visibleColumns.length} 
                    className="text-center h-32"
                  >
                    Không tìm thấy người dùng nào.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    {visibleColumns.includes("user") && (
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{getUserInitials(user.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                          </div>
                        </div>
                      </TableCell>
                    )}
                    {visibleColumns.includes("email") && (
                      <TableCell>{user.email}</TableCell>
                    )}
                    {visibleColumns.includes("role") && (
                      <TableCell>{renderRoleBadge(user.role)}</TableCell>
                    )}
                    {visibleColumns.includes("status") && (
                      <TableCell>{renderStatusBadge(user.status)}</TableCell>
                    )}
                    {visibleColumns.includes("lastLogin") && (
                      <TableCell>
                        {user.lastLogin 
                          ? formatDate(user.lastLogin) 
                          : "Chưa đăng nhập"}
                      </TableCell>
                    )}
                    {visibleColumns.includes("actions") && (
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" 
                            onClick={() => navigate(`/users/${user.id}`)}>
                            <User className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" 
                            onClick={() => navigate(`/users/${user.id}/edit`)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
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
              setCurrentPage(1);
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default UsersList;
