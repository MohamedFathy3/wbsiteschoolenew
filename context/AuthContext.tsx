"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '@/lib/api/auth';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  type: string;
  image: string | null;
  qr_code: string;
  stage: string;
  country: string;
  average_rating: number;
  role?: string; // أضف role هنا
  courses?: any[];
  comments?: any[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, userType?: 'student' | 'teacher') => Promise<boolean>; // أضف userType
  logout: () => Promise<void>;
  getFullProfile: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const loadFromCookies = (): User | null => {
    try {
      const userCookie = Cookies.get('user');
      const tokenCookie = Cookies.get('token');
      
      if (userCookie && tokenCookie) {
        return JSON.parse(userCookie);
      }
    } catch (error) {
      console.error('Error loading from cookies:', error);
    }
    return null;
  };

  const checkAuth = async () => {
    try {
      setLoading(true);
      
      const cookieUser = loadFromCookies();
      if (cookieUser) {
        setUser(cookieUser);
        setIsAuthenticated(true);
      }
      
      const data = await authApi.checkAuth();
      
      if (data.authenticated && data.user) {
        setUser(data.user);
        setIsAuthenticated(true);
      }
      
    } catch (error) {
      console.log('Auth check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFullProfile = async () => {
    try {
      const data = await authApi.checkAuth();
      return data.fullData || null;
    } catch (error) {
      console.error('Error getting full profile:', error);
      return null;
    }
  };

  // تحديث دالة login لتقبل userType
  const login = async (email: string, password: string, userType: 'student' | 'teacher' = 'student'): Promise<boolean> => {
    try {
      // استدعاء authApi.login مع 3 باراميترات
      const result = await authApi.login(email, password, userType);
      
      if (result.success && result.user) { // تغيير من result.student إلى result.user
        setUser(result.user);
        setIsAuthenticated(true);
        toast.success(userType === 'teacher' ? 'تم تسجيل دخول المعلم بنجاح' : 'تم تسجيل الدخول بنجاح');
        return true;
      }
      return false;
    } catch (error: any) {
      toast.error(error.message);
      return false;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.log('Logout API error');
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      toast.success('تم تسجيل الخروج');
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    getFullProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};