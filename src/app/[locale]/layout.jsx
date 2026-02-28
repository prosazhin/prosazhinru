import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ToTop from '@/components/ToTop';
import TranslationsProvider from '@/components/TranslationsProvider';
import { i18nConfig, initTranslations } from '@/i18n';
import '@/styles/globals.css';
import { PBCProvider } from '@pbcomponents/react';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { dir } from 'i18next';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

const RootLayout = async ({ children, params }) => {
  const { locale } = await params;
  const { resources } = await initTranslations(locale);

  if (!i18nConfig.locales.includes(locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      dir={dir(locale)}
      className='scroll-smooth'
    >
      <head>
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap'
          rel='stylesheet'
        />
      </head>
      <body>
        <TranslationsProvider
          locale={locale}
          resources={resources}
        >
          <PBCProvider notificationTop={80}>
            <Header locale={locale} />
            <main className='desktop:min-h-[calc(100vh-107px-80px-(72px+40px))] mt-[calc(72px+40px)] mb-80 min-h-[calc(100vh-299px-80px-(72px+40px))]'>
              {children}
              <Analytics />
              <SpeedInsights />
            </main>
            <Footer locale={locale} />
          </PBCProvider>
        </TranslationsProvider>
        <ToTop />
      </body>
    </html>
  );
};

export const viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default RootLayout;
