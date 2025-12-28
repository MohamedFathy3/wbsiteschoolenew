// utils/urlHelper.ts

/**
 * تأكد من أن جميع الروابط هي HTTPS
 */
export const ensureHttps = (url: string | null | undefined): string => {
  if (!url || typeof url !== 'string') return '';
  
  let fixedUrl = url.trim();
  
  // إزالة المسافات الزائدة
  fixedUrl = fixedUrl.trim();
  
  // إذا كان الرابط فارغاً بعد التقليم
  if (!fixedUrl) return '';
  
  // استبدال http:// بـ https://
  if (fixedUrl.startsWith('http://')) {
    fixedUrl = fixedUrl.replace('http://', 'https://');
  }
  
  // إذا كان الرابط يبدأ بـ // بدون بروتوكول
  if (fixedUrl.startsWith('//')) {
    fixedUrl = 'https:' + fixedUrl;
  }
  
  // إذا لم يبدأ بأي بروتوكول
  if (!fixedUrl.startsWith('http://') && !fixedUrl.startsWith('https://') && !fixedUrl.startsWith('//')) {
    // إذا كان يبدأ بـ / فهو رابط داخلي
    if (fixedUrl.startsWith('/')) {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://westhors.dentin.cloud';
      fixedUrl = baseUrl + fixedUrl;
    } else {
      // رابط خارجي بدون بروتوكول
      fixedUrl = 'https://' + fixedUrl;
    }
  }
  
  // تأكد مرة أخرى من HTTPS
  if (fixedUrl.startsWith('http://')) {
    fixedUrl = fixedUrl.replace('http://', 'https://');
  }
  
  return fixedUrl;
};

/**
 * تأكد من أن رابط الملف آمن للتحميل
 */
export const getSecureFileUrl = (filePath: string | null | undefined): string => {
  if (!filePath || typeof filePath !== 'string') return '';
  
  const trimmedPath = filePath.trim();
  
  if (!trimmedPath) return '';
  
  // إذا كان مسار ملف من السيرفر
  if (trimmedPath.startsWith('/storage/')) {
    const baseUrl = process.env.NEXT_PUBLIC_STORAGE_URL || 'https://westhors.dentin.cloud';
    return ensureHttps(`${baseUrl}${trimmedPath}`);
  }
  
  // إذا كان رابط كامل
  if (trimmedPath.startsWith('http://') || trimmedPath.startsWith('https://') || trimmedPath.startsWith('//')) {
    return ensureHttps(trimmedPath);
  }
  
  // إذا كان مجرد اسم ملف
  const baseUrl = process.env.NEXT_PUBLIC_STORAGE_URL || 'https://westhors.dentin.cloud';
  return ensureHttps(`${baseUrl}/storage/${trimmedPath}`);
};

/**
 * تحقق مما إذا كان الرابط آمنًا
 */
export const isSecureUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  return url.startsWith('https://');
};

/**
 * معالجة أخطاء الصور والملفات
 */
export const handleFileError = (event: React.SyntheticEvent<HTMLImageElement | HTMLAnchorElement>) => {
  const target = event.target;
  
  if (target instanceof HTMLImageElement) {
    target.src = '/assets/images/default-file.png';
    target.alt = 'File not available';
  } else if (target instanceof HTMLAnchorElement) {
    target.style.opacity = '0.5';
    target.style.pointerEvents = 'none';
    target.textContent = target.getAttribute('data-lang') === 'ar' 
      ? '⚠️ الملف غير متاح' 
      : '⚠️ File Unavailable';
  }
};

/**
 * الحصول على رابط عبر Proxy للأمان
 */
export const getProxyUrl = (url: string): string => {
  if (!url || typeof url !== 'string') return '';
  
  const trimmedUrl = url.trim();
  
  if (!trimmedUrl) return '';
  
  // إذا كان الرابط يبدأ بـ http://، استخدم proxy
  if (trimmedUrl.startsWith('http://')) {
    const encodedUrl = encodeURIComponent(trimmedUrl);
    return `/api/proxy?url=${encodedUrl}`;
  }
  
  // وإلا أعد الرابط كما هو بعد تأمينه
  return ensureHttps(trimmedUrl);
};

/**
 * دالة لتنزيل الملفات بأمان
 */
export const downloadFile = async (url: string, fileName: string): Promise<void> => {
  const secureUrl = getSecureFileUrl(url);
  
  if (!isSecureUrl(secureUrl)) {
    alert(`Insecure link detected for: ${fileName}`);
    return;
  }
  
  try {
    const response = await fetch(secureUrl, {
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Accept': 'application/octet-stream'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
    
  } catch (error) {
    console.error('Download failed:', error);
    // فتح الرابط في تاب جديد كبديل
    window.open(secureUrl, '_blank', 'noopener,noreferrer');
  }
};

/**
 * الحصول على أيقونة الملف حسب الامتداد
 */
export const getFileIcon = (fileName: string): string => {
  if (!fileName || typeof fileName !== 'string') return '📎';
  
  const extension = fileName.split('.').pop()?.toLowerCase() || '';
  
  const iconMap: Record<string, string> = {
    // مستندات
    'pdf': '📄',
    'doc': '📝',
    'docx': '📝',
    'txt': '📄',
    'rtf': '📄',
    
    // جداول بيانات
    'xls': '📊',
    'xlsx': '📊',
    'csv': '📊',
    
    // عروض تقديمية
    'ppt': '📑',
    'pptx': '📑',
    
    // صور
    'jpg': '🖼️',
    'jpeg': '🖼️',
    'png': '🖼️',
    'gif': '🖼️',
    'bmp': '🖼️',
    'svg': '🖼️',
    'webp': '🖼️',
    
    // فيديو
    'mp4': '🎬',
    'avi': '🎬',
    'mov': '🎬',
    'wmv': '🎬',
    'flv': '🎬',
    'mkv': '🎬',
    
    // صوت
    'mp3': '🎵',
    'wav': '🎵',
    'ogg': '🎵',
    'm4a': '🎵',
    
    // أرشيف
    'zip': '📦',
    'rar': '📦',
    '7z': '📦',
    'tar': '📦',
    'gz': '📦',
    
    // كود
    'html': '🌐',
    'css': '🎨',
    'js': '⚡',
    'json': '📋',
    'xml': '📋',
    
    // أخرى
    'exe': '⚙️',
    'dll': '⚙️',
    'msi': '⚙️',
  };
  
  return iconMap[extension] || '📎';
};

/**
 * الحصول على اسم الملف من المسار
 */
export const getFileNameFromPath = (path: string): string => {
  if (!path || typeof path !== 'string') return '';
  return path.split('/').pop() || path;
};

/**
 * فتح الرابط بأمان
 */
export const openSecureLink = (url: string, fileName: string = 'File'): void => {
  const secureUrl = getSecureFileUrl(url);
  
  if (!isSecureUrl(secureUrl)) {
    alert(`Insecure link detected for: ${fileName}`);
    return;
  }
  
  window.open(secureUrl, '_blank', 'noopener,noreferrer');
};