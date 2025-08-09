
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, LoginCredentials } from "@/types/user";
import { users } from "@/data/users";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  getUsers: () => User[];
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: async () => false,
  logout: () => {},
  getUsers: () => [],
});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in via localStorage
    const storedUser = localStorage.getItem("crm-user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        localStorage.removeItem("crm-user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    // Simulating API call with delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Find user with matching email
        const foundUser = users.find(
          (u) => u.email.toLowerCase() === credentials.email.toLowerCase()
        );
        
        if (foundUser && foundUser.status === "active") {
          // Special case for demo user with password 123456
          if (foundUser.email === "demo@gmail.com" && credentials.password === "123456") {
            const updatedUser = {
              ...foundUser,
              lastLogin: new Date()
            };
            
            localStorage.setItem("crm-user", JSON.stringify(updatedUser));
            setUser(updatedUser);
            toast.success("Đăng nhập thành công!");
            resolve(true);
            return;
          }
          
          // For other users, check if the password is "password"
          if (credentials.password === "password") {
            // Update last login time
            const updatedUser = {
              ...foundUser,
              lastLogin: new Date()
            };
            
            // Save to localStorage
            localStorage.setItem("crm-user", JSON.stringify(updatedUser));
            setUser(updatedUser);
            toast.success("Đăng nhập thành công!");
            resolve(true);
          } else {
            toast.error("Sai mật khẩu!");
            resolve(false);
          }
        } else if (foundUser && foundUser.status === "inactive") {
          toast.error("Tài khoản của bạn đã bị vô hiệu hóa!");
          resolve(false);
        } else {
          toast.error("Email không tồn tại!");
          resolve(false);
        }
      }, 800); // Simulate network delay
    });
  };

  const logout = () => {
    localStorage.removeItem("crm-user");
    setUser(null);
    toast.success("Đã đăng xuất thành công!");
  };

  const getUsers = () => {
    return users;
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    getUsers
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
