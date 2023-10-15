import { headers } from 'next/headers';

import '@/styles/globals.css';

const RootLayout = async ({ children }) => {
  const _headers = headers();
  const lang = _headers.get('x-lang');

  // useEffect(() => {
  //   if (lang === 'en') {
  //     router.push('/');
  //   }
  // }, [lang, router]);

  return (
    <html lang={lang}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
