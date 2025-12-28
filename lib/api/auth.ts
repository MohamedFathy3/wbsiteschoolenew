import api from './index';
import Cookies from 'js-cookie';

export const authApi = {
  // تسجيل الدخول
  login: async (email: string, password: string, userType: 'student' | 'teacher') => {
    try {
      const endpoint = userType === 'student' ? '/student/login' : '/teachers/login';
      const response = await api.post(endpoint, {
        email,
        password
      });
      
      const { data } = response;
      
      if (data.result === 'Success' && data.message?.token) {
        // حفظ التوكن في الكوكيز
        Cookies.set('token', data.message.token, { 
          expires: 7,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
        
        // حفظ بيانات المستخدم في الكوكيز مع إضافة الدور
        const userData = data.message?.student || data.message?.teacher || data.message?.user;
        if (userData) {
          userData.role = userType; // إضافة الدور
          Cookies.set('user', JSON.stringify(userData), {
            expires: 7,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
          });
        }
        
        return {
          success: true,
          user: userData,
          token: data.message.token,
          message: data.message.message
        };
      } else {
        throw new Error(data.message?.message || 'Login failed');
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      }
      throw new Error('حدث خطأ في الاتصال');
    }
  },

  // التحقق من حالة المستخدم (ترجع بيانات كاملة)
  checkAuth: async () => {
    try {
      const response = await api.get('/student/check-auth');
      const { data } = response;
      
      console.log('API Response:', data);
      
      if (data.result === 'Success') {
        const userData = data.message?.student || data.message?.teacher || data.message?.user || data.data;
        if (userData) {
          // تحديد الدور بناءً على البيانات
          let role = 'student';
          if (data.message?.teacher || (data.data && data.data.teacher_id)) {
            role = 'teacher';
          }
          
          userData.role = role;
          Cookies.set('user', JSON.stringify(userData), {
            expires: 7,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
          });
          
          return {
            user: userData,
            authenticated: true,
            fullData: data.message || data
          };
        }
      }
      
      return {
        user: null,
        authenticated: false,
        fullData: null
      };
      
    } catch (error: any) {
      console.error('Auth check error:', error);
      return {
        user: null,
        authenticated: false,
        fullData: null
      };
    }
  },

  logout: async () => {
    try {
      // await api.post('/logout');
         Cookies.remove('token');
      Cookies.remove('user');
    } catch (error) {
      console.log('Logout API error');
    } finally {
      Cookies.remove('token');
      Cookies.remove('user');
    }
    return { success: true };
  },

  getToken: (): string | null => {
    return Cookies.get('token') || null;
  },

  getUser: (): any | null => {
    const userCookie = Cookies.get('user');
    return userCookie ? JSON.parse(userCookie) : null;
  }
};