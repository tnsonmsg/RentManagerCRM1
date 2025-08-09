
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { List } from 'lucide-react';

export interface ColumnDef {
  id: string;
  header: string;
  accessorKey?: string;
  cell?: (props: any) => React.ReactNode;
  enableHiding?: boolean;
}

interface ColumnVisibilityProps {
  columns: ColumnDef[];
  visibleColumns: string[];
  onColumnVisibilityChange: (column: string, isVisible: boolean) => void;
  onToggleAllColumns: (visible: boolean) => void;
}

export const ColumnVisibility: React.FC<ColumnVisibilityProps> = ({
  columns,
  visibleColumns,
  onColumnVisibilityChange,
  onToggleAllColumns,
}) => {
  const hidableColumns = columns.filter((column) => column.enableHiding !== false);
  const allColumnsVisible = hidableColumns.every((column) => visibleColumns.includes(column.id));
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto h-8">
          <List className="mr-2 h-4 w-4" />
          Hiển thị cột
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]">
        <DropdownMenuLabel>Hiển thị/Ẩn cột</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={allColumnsVisible}
          onCheckedChange={(checked) => onToggleAllColumns(checked)}
        >
          Tất cả
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        {hidableColumns.map((column) => (
          <DropdownMenuCheckboxItem
            key={column.id}
            checked={visibleColumns.includes(column.id)}
            onCheckedChange={(checked) => onColumnVisibilityChange(column.id, checked)}
          >
            {column.header}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
