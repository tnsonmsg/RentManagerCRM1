
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-crm-700 mb-2">404</h1>
      <h2 className="text-2xl font-medium mb-4">Trang không tồn tại</h2>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển đến vị trí khác.
      </p>
      <Button onClick={() => navigate('/')} className="flex items-center gap-2">
        <Home className="h-4 w-4" />
        Quay lại trang chủ
      </Button>
    </div>
  );
};

export default NotFound;
