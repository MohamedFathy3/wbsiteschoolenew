import Cookies from 'js-cookie';

export const storage = {
  // حفظ التوكن
  setToken: (token: string) => {
    Cookies.set('token', token, { 
      expires: 7, // 7 أيام
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
  },

  // جلب التوكن
  getToken: (): string | null => {
    return Cookies.get('token') || null;
  },

  // حفظ بيانات المستخدم
  setUser: (user: any) => {
    Cookies.set('user', JSON.stringify(user), {
      expires: 7,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
  },

  // جلب بيانات المستخدم
  getUser: (): any | null => {
    const userCookie = Cookies.get('user');
    return userCookie ? JSON.parse(userCookie) : null;
  },

  // التحقق من وجود جلسة
  hasSession: (): boolean => {
    return !!(Cookies.get('token') && Cookies.get('user'));
  },

  // مسح الجلسة
  clearSession: () => {
    Cookies.remove('token');
    Cookies.remove('user');
  }
};