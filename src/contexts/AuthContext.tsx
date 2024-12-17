import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface User {
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check for stored auth token on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Mock login - replace with actual API call later
      if (email === 'admin@example.com' && password === 'admin') {
        const userData = { email, role: 'admin' as const };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/admin');
        toast({
          title: "Welcome back!",
          description: "Successfully logged in as admin",
        });
      } else if (email && password) {
        const userData = { email, role: 'user' as const };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/kyc');
        toast({
          title: "Welcome!",
          description: "Successfully logged in",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
    toast({
      title: "Logged out",
      description: "Successfully logged out",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};