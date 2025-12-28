import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // إذا كان المسار هو /profile، تحقق من وجود الكوكيز
  if (pathname === '/profile') {
    const token = request.cookies.get('token');
    const user = request.cookies.get('user');
    
    if (!token || !user) {
      // إعادة التوجيه للصفحة الرئيسية
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/profile'],
};