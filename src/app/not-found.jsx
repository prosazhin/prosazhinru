import { headers } from 'next/headers';
import NextLink from 'next/link';

import { getDictionary } from '@/utils/get-dictionaries';

import Container from '@/components/Container';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Mixpanel from '@/components/Mixpanel';

const NotFound = async () => {
  const _headers = headers();
  const lang = _headers.get('x-lang');
  const t = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} />
      <main className="mb-[80px] mt-[calc(72px+40px)]">
        <Container small>
          <h1 className="w-full text-h1 text-base-main">{t.pages.notFound.title}</h1>
          <NextLink className="text-tm2 mt-[24px] inline-flex" href="/">
            {t.goToHome}
          </NextLink>
        </Container>
      </main>
      <Footer lang={lang} />
      <Mixpanel event="LOADING_404_ERROR_PAGE" />
    </>
  );
};

export default NotFound;
