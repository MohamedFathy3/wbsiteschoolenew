// app/head.tsx
export default function Head() {
  return (
    <>
      {/* العنوان */}
      <title>Teacher Market - منصة المعلمين</title>

      {/* الوصف */}
      <meta 
        name="description" 
        content="Teacher Market: منصة لتعليم وتبادل الدورات التعليمية عبر الإنترنت" 
      />

      {/* Favicon */}
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

      {/* تحسين محركات البحث */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph (لينكات المشاركة على الفيسبوك وواتساب) */}
      <meta property="og:title" content="Teacher Market - منصة المعلمين" />
      <meta property="og:description" content="Teacher Market: منصة لتعليم وتبادل الدورات التعليمية عبر الإنترنت" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/favicon.svg" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Teacher Market - منصة المعلمين" />
      <meta name="twitter:description" content="Teacher Market: منصة لتعليم وتبادل الدورات التعليمية عبر الإنترنت" />
      <meta name="twitter:image" content="/favicon.svg" />
    </>
  );
}
