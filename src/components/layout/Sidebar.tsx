
import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogIn,
  LogOut,
  UserCog,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {
  const { isAuthenticated, logout, user } = useAuth();
  
  const navItems = [
    {
      title: "Tổng quan",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/",
      auth: true,
    },
    {
      title: "Khách hàng",
      icon: <Users className="h-5 w-5" />,
      href: "/customers",
      auth: true,
    },
    {
      title: "Hợp đồng",
      icon: <FileText className="h-5 w-5" />,
      href: "/contracts",
      auth: true,
    },
    {
      title: "Người dùng",
      icon: <UserCog className="h-5 w-5" />,
      href: "/users",
      auth: true,
      admin: true,
    },
    {
      title: "Cài đặt",
      icon: <Settings className="h-5 w-5" />,
      href: "/settings",
      auth: true,
    },
  ];

  // Filter menu items based on authentication and role
  const filteredNavItems = navItems.filter(item => {
    if (item.auth && !isAuthenticated) return false;
    if (item.admin && user?.role !== 'admin') return false;
    return true;
  });

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col bg-white">
        <div
          className={cn(
            "flex h-16 items-center justify-between border-b px-4",
            collapsed ? "justify-center" : ""
          )}
        >
          {!collapsed && (
            <h2 className="text-xl font-bold text-crm-700">CRM System</h2>
          )}
          <button
            onClick={toggleSidebar}
            className={cn(
              "rounded-lg p-1.5 hover:bg-gray-100",
              collapsed ? "ml-0" : "ml-auto"
            )}
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {filteredNavItems.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center rounded-lg px-4 py-3 transition-colors",
                      isActive
                        ? "bg-crm-100 text-crm-700"
                        : "text-gray-600 hover:bg-gray-100",
                      collapsed ? "justify-center px-3" : ""
                    )
                  }
                >
                  {item.icon}
                  {!collapsed && <span className="ml-3">{item.title}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t p-4">
          {isAuthenticated ? (
            <button
              onClick={logout}
              className={cn(
                "flex w-full items-center rounded-lg px-4 py-2 text-red-600 hover:bg-gray-100",
                collapsed ? "justify-center" : ""
              )}
            >
              <LogOut className="h-5 w-5" />
              {!collapsed && <span className="ml-3">Đăng xuất</span>}
            </button>
          ) : (
            <NavLink
              to="/login"
              className={cn(
                "flex w-full items-center rounded-lg px-4 py-2 text-crm-700 hover:bg-gray-100",
                collapsed ? "justify-center" : ""
              )}
            >
              <LogIn className="h-5 w-5" />
              {!collapsed && <span className="ml-3">Đăng nhập</span>}
            </NavLink>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
