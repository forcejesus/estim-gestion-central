
import React, { createContext, useContext, useState, useEffect } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "gestionnaire" | "agent";
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

// Mock users for demonstration
const MOCK_USERS = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@estim.edu",
    password: "admin123",
    role: "admin" as const,
  },
  {
    id: "2",
    name: "Gestionnaire",
    email: "gestionnaire@estim.edu",
    password: "gest123",
    role: "gestionnaire" as const,
  },
  {
    id: "3",
    name: "Agent",
    email: "agent@estim.edu",
    password: "agent123",
    role: "agent" as const,
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved user session on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("estim_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );
    
    if (!foundUser) {
      setIsLoading(false);
      throw new Error("Invalid email or password");
    }
    
    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem("estim_user", JSON.stringify(userWithoutPassword));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("estim_user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
