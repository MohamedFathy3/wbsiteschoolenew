"use client";

import { useEffect } from 'react';
import Cookies from 'js-cookie';

export default function DebugCookies() {
  useEffect(() => {
    console.log('Current cookies:', {
      token: Cookies.get('token') ? 'Exists' : 'Missing',
      user: Cookies.get('user') ? 'Exists' : 'Missing',
      allCookies: document.cookie
    });
  }, []);

  return null;
}