
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { mockContracts } from '@/utils/mockData';

const ContractsByStatus: React.FC = () => {
  // Count contracts by status
  const statusCount = mockContracts.reduce((acc: Record<string, number>, contract) => {
    acc[contract.status] = (acc[contract.status] || 0) + 1;
    return acc;
  }, {});
  
  // Convert to array of objects for chart
  const data = Object.entries(statusCount).map(([status, count]) => ({
    name: status,
    value: count
  }));
  
  // Translate status names for display
  const getStatusName = (status: string) => {
    switch (status) {
      case 'active': return 'Đang hoạt động';
      case 'completed': return 'Hoàn thành';
      case 'draft': return 'Bản nháp';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };
  
  // Colors for each status
  const COLORS = ['#4CAF50', '#9C27B0', '#FFC107', '#F44336'];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hợp đồng theo trạng thái</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, 'Số lượng']} 
                       labelFormatter={(label) => getStatusName(label)} />
              <Legend formatter={(value) => getStatusName(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractsByStatus;
