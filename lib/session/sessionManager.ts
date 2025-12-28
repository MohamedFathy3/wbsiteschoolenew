"use client";

import { authApi } from '@/lib/api/auth';

class SessionMonitor {
  private static instance: SessionMonitor;
  private checkInterval: NodeJS.Timeout | null = null;
  private isChecking: boolean = false;

  static getInstance(): SessionMonitor {
    if (!SessionMonitor.instance) {
      SessionMonitor.instance = new SessionMonitor();
    }
    return SessionMonitor.instance;
  }

  // بدء مراقبة الجلسة
  startMonitoring(interval: number = 5 * 60 * 1000) { // كل 5 دقائق
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }

    this.checkInterval = setInterval(() => {
      this.checkSession();
    }, interval);
  }

  // إيقاف المراقبة
  stopMonitoring() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }

  // التحقق من الجلسة
  private async checkSession() {
    if (this.isChecking) return;
    
    this.isChecking = true;
    
    try {
      const data = await authApi.checkAuth();
      
      if (!data.authenticated) {
        // إذا انتهت الجلسة، مسح البيانات المحلية
        if (typeof window !== 'undefined') {
          localStorage.removeItem('student_token');
          localStorage.removeItem('student_data');
          sessionStorage.removeItem('access_token');
          sessionStorage.removeItem('user_data');
        }
        
        // إرسال حدث بأن الجلسة انتهت
        document.dispatchEvent(new CustomEvent('sessionExpired'));
      }
    } catch (error) {
      console.error('Session monitor error:', error);
    } finally {
      this.isChecking = false;
    }
  }

  // التحقق من وجود بيانات جلسة محلية
  hasLocalSession(): boolean {
    if (typeof window === 'undefined') return false;
    
    const hasLocalStorage = 
      localStorage.getItem('student_token') && 
      localStorage.getItem('student_data');
    
    const hasSessionStorage = 
      sessionStorage.getItem('access_token') && 
      sessionStorage.getItem('user_data');
    
    return !!(hasLocalStorage || hasSessionStorage);
  }
}

export const sessionMonitor = SessionMonitor.getInstance();