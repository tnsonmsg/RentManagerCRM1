
import React from 'react';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/dashboard/StatCard';
import RevenueChart from '@/components/dashboard/RevenueChart';
import ContractsByStatus from '@/components/dashboard/ContractsByStatus';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { getDashboardStats } from '@/utils/mockData';
import { formatCurrency } from '@/utils/dateUtils';
import { Users, FileText, DollarSign, Briefcase } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = getDashboardStats();

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Tổng quan</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Tổng số khách hàng" 
          value={stats.totalCustomers}
          icon={<Users className="h-5 w-5" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard 
          title="Khách hàng đang hoạt động" 
          value={stats.activeCustomers}
          icon={<Users className="h-5 w-5" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard 
          title="Tổng số hợp đồng" 
          value={stats.totalContracts}
          icon={<FileText className="h-5 w-5" />}
          trend={{ value: 20, isPositive: true }}
        />
        <StatCard 
          title="Doanh thu tháng này" 
          value={formatCurrency(stats.revenueThisMonth)}
          icon={<DollarSign className="h-5 w-5" />}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <ContractsByStatus />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <RecentActivity />
        </div>
        <div className="bg-white rounded-lg border border-border p-6">
          <h3 className="font-medium mb-4">Thống kê nhanh</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-border">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">Tổng khách hàng</span>
              </div>
              <span className="font-medium">{stats.totalCustomers}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-border">
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">Hợp đồng đang hoạt động</span>
              </div>
              <span className="font-medium">{stats.activeContracts}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-border">
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">Hợp đồng mới trong tháng</span>
              </div>
              <span className="font-medium">3</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">Tổng doanh thu</span>
              </div>
              <span className="font-medium">{formatCurrency(stats.totalRevenue)}</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
