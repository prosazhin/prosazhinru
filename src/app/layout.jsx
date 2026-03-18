import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ScrollToTop from '@/components/ScrollToTop';
import ToTop from '@/components/ToTop';
import TranslationsProvider from '@/components/TranslationsProvider';
import { initTranslations } from '@/i18n';
import '@/styles/globals.css';
import { getLocale } from '@/utils/get-locale';
import { PBCProvider } from '@prosazhin/pbcomponents';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { dir } from 'i18next';

// Локаль читается из cookie NEXT_LOCALE — layout должен рендериться динамически на каждый запрос
export const dynamic = 'force-dynamic';

const RootLayout = async ({ children }) => {
  const locale = await getLocale();
  const [{ resources }, { default: nav }] = await Promise.all([
    initTranslations(locale),
    import('@/data/nav'),
  ]);

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
          key={locale}
          locale={locale}
          resources={resources}
        >
          <PBCProvider notifications={{ top: 80 }}>
            <Header
              locale={locale}
              nav={nav}
            />
            <main className='desktop:min-h-[calc(100vh-107px-80px-(72px+40px))] mt-[calc(72px+40px)] mb-80 min-h-[calc(100vh-299px-80px-(72px+40px))]'>
              {children}
              <Analytics />
              <SpeedInsights />
            </main>
            <Footer locale={locale} />
          </PBCProvider>
        </TranslationsProvider>
        <ScrollToTop />
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
