import { i18n } from '@/utils/i18n';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

const LangLayout = async ({ children, params: { lang } }) => {
  return (
    <html lang={lang}>
      <body>
        <Header lang={lang} />
        <main className="mb-[80px] mt-[calc(72px+40px)]">{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
};

export default LangLayout;
