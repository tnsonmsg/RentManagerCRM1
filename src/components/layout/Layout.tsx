
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/") return "Tổng quan";
    if (path.includes("/customers")) return "Khách hàng";
    if (path.includes("/contracts")) return "Hợp đồng";
    if (path.includes("/search")) return "Tìm kiếm";
    if (path.includes("/settings")) return "Cài đặt";
    return "CRM System";
  };

  return (
    <div className="bg-background min-h-screen">
      <Sidebar 
        collapsed={collapsed} 
        toggleSidebar={() => setCollapsed(!collapsed)} 
      />

      <div
        className={cn(
          "min-h-screen transition-all duration-300",
          collapsed ? "ml-16" : "ml-64"
        )}
      >
        <Header title={getPageTitle()} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
