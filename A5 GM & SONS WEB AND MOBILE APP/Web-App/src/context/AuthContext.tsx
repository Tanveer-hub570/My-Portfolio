
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface User {
  id: string;
  phone: string;
  name?: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (phone: string, password?: string) => Promise<boolean>;
  logout: () => void;
  register: (phone: string, name: string) => Promise<boolean>;
}

const ADMIN_EMAIL = 'gmson@gmail.com';
const ADMIN_PASSWORD = 'tanveer123';
const ADMIN_PHONE = '+923001234567'; // Example admin phone

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Load from localStorage on initial render
    const savedUser = localStorage.getItem('gm-sons-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const { toast } = useToast();

  // Compute derived state
  const isAuthenticated = user !== null;
  const isAdmin = user?.isAdmin || false;

  // Save to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('gm-sons-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('gm-sons-user');
    }
  }, [user]);

  // Login with phone number or admin credentials
  const login = async (phoneOrEmail: string, password?: string): Promise<boolean> => {
    // Check for admin login
    if (phoneOrEmail === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser: User = {
        id: 'admin-1',
        phone: ADMIN_PHONE,
        name: 'Admin',
        isAdmin: true,
      };
      setUser(adminUser);
      toast({
        title: "Welcome Admin",
        description: "You have successfully logged in as an admin.",
      });
      return true;
    }

    // Phone number based login for regular users
    // In a real app, this would validate with an SMS code
    // Here we're just checking if the user exists in local storage
    
    // Normalize phone number (simple version)
    const normalizedPhone = phoneOrEmail.startsWith('+') 
      ? phoneOrEmail 
      : `+${phoneOrEmail}`;

    // Check if a user with this phone exists (from local storage)
    const usersJson = localStorage.getItem('gm-sons-users') || '[]';
    const users: User[] = JSON.parse(usersJson);
    const existingUser = users.find(u => u.phone === normalizedPhone);

    if (existingUser) {
      setUser(existingUser);
      toast({
        title: "Welcome back!",
        description: `You have successfully logged in.`,
      });
      return true;
    } else {
      toast({
        title: "Login Failed",
        description: "No account found with this phone number. Please register first.",
        variant: "destructive",
      });
      return false;
    }
  };

  const register = async (phone: string, name: string): Promise<boolean> => {
    // Normalize phone number (simple version)
    const normalizedPhone = phone.startsWith('+') ? phone : `+${phone}`;
    
    // Check if user already exists
    const usersJson = localStorage.getItem('gm-sons-users') || '[]';
    const users: User[] = JSON.parse(usersJson);
    
    if (users.some(user => user.phone === normalizedPhone)) {
      toast({
        title: "Registration Failed",
        description: "An account with this phone number already exists.",
        variant: "destructive",
      });
      return false;
    }
    
    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      phone: normalizedPhone,
      name,
      isAdmin: false,
    };
    
    // Save to users array
    users.push(newUser);
    localStorage.setItem('gm-sons-users', JSON.stringify(users));
    
    // Log user in
    setUser(newUser);
    
    toast({
      title: "Registration Successful",
      description: `Welcome to GM & SONS, ${name}!`,
    });
    
    return true;
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
