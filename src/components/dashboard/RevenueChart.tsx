
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockContracts } from '@/utils/mockData';

// Create fake revenue data for the chart
const getMonthlyData = () => {
  const months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];
  
  // Initialize data
  const data = months.map(month => ({
    name: month,
    revenue: 0,
    contracts: 0
  }));
  
  // Populate with contract data
  mockContracts.forEach(contract => {
    const month = new Date(contract.startDate).getMonth();
    data[month].revenue += contract.value / 1000000; // Convert to millions
    data[month].contracts += 1;
  });
  
  return data;
};

const RevenueChart: React.FC = () => {
  const data = getMonthlyData();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Doanh thu theo tháng (triệu đồng)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value.toLocaleString()} triệu`, 'Doanh thu']} />
              <Bar dataKey="revenue" fill="#9b87f5" name="Doanh thu" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
