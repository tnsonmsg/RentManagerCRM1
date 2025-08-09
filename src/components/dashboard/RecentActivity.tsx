
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockCustomers, mockContracts } from '@/utils/mockData';
import { formatDateRelative } from '@/utils/dateUtils';
import { User, FileText, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Function to generate recent activities
const getRecentActivities = () => {
  // Combine customers and contracts by date
  const customerActivities = mockCustomers.map(customer => ({
    id: `customer-${customer.id}`,
    type: 'customer',
    title: `Khách hàng mới: ${customer.name}`,
    date: customer.createdAt,
    link: `/customers/${customer.id}`
  }));
  
  const contractActivities = mockContracts.map(contract => ({
    id: `contract-${contract.id}`,
    type: 'contract',
    title: `Hợp đồng mới: ${contract.title}`,
    date: contract.createdAt,
    link: `/contracts/${contract.id}`
  }));
  
  // Combine and sort by date (newest first)
  return [...customerActivities, ...contractActivities]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
};

const RecentActivity: React.FC = () => {
  const navigate = useNavigate();
  const activities = getRecentActivities();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hoạt động gần đây</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map(activity => (
            <div 
              key={activity.id}
              className="flex items-start p-3 hover:bg-muted/50 rounded-md cursor-pointer"
              onClick={() => navigate(activity.link)}
            >
              <div className="rounded-full bg-crm-50 p-2 mr-3">
                {activity.type === 'customer' ? (
                  <User className="h-4 w-4 text-crm-700" />
                ) : (
                  <FileText className="h-4 w-4 text-crm-700" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDateRelative(activity.date)}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
