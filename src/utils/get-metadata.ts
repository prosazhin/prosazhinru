import { AnyObjectType, LangType } from '@/types';

const PROD = process.env.NEXT_PUBLIC_NODE_ENV === 'production';
const SITE_URL = PROD ? 'https://prosazhin.ru' : 'http://localhost:8080';
const SITE_NAME = 'prosazhin';
const TYPE = 'website';
const GOOGLE = 'oXkccV9eEltz10YzICaE33ZUFtjof1E4fFLFE4EgW-0';
const YANDEX = 'dd48801ed051b178';

type Props = {
  lang: LangType;
  title: string;
  description: string;
  pathname: string;
  isRobotsIndexPage: boolean;
};

const faviconIcons = ['16x16', '32x32', '96x96', '128x128', '196x196'];

const appleIcons = [
  '57x57',
  '60x60',
  '72x72',
  '76x76',
  '114x114',
  '120x120',
  '144x144',
  '152x152',
  '167x167',
  '180x180',
];

const metaOthers = [
  { name: 'format-detection', content: 'telephone=no' },
  { name: 'apple-mobile-web-app-capable', content: 'yes' },
  { name: 'mobile-web-app-capable', content: 'yes' },
  { name: 'google', content: 'notranslate' },
  { name: 'msapplication-TileColor', content: '#ffffff' },
  { name: 'msapplication-square70x70logo', content: '/favicon/mstile-70x70.png' },
  { name: 'msapplication-TileImage', content: '/favicon/mstile-144x144.png' },
  { name: 'msapplication-square150x150logo', content: '/favicon/mstile-150x150.png' },
  { name: 'msapplication-wide310x150logo', content: '/favicon/mstile-310x150.png' },
  { name: 'msapplication-square310x310logo', content: '/favicon/mstile-310x310.png' },
];

const getMetadata = ({ lang, title, description, pathname, isRobotsIndexPage = true }: Props) => {
  const currentUrl = pathname === '/' ? SITE_URL : SITE_URL + pathname;
  const canonicalUrl = pathname ? currentUrl : false;
  const imageUrl = SITE_URL + `/sharing/${lang}.png`;

  const icons = faviconIcons.map((item) => ({
    url: `/favicon/favicon-${item}.png`,
    sizes: `${item}`,
    type: 'image/png',
  }));

  const iconsOther = appleIcons.map((item) => ({
    rel: 'apple-touch-icon-precomposed',
    url: `/favicon/apple-touch-icon-${item}.png`,
    sizes: `${item}`,
    type: 'image/png',
  }));

  const other: AnyObjectType = {};

  metaOthers.forEach(({ name, content }) => {
    other[name] = content;
  });

  return {
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
    },
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    metadataBase: new URL(SITE_URL),
    themeColor: '#ffffff',
    icons: {
      icon: [
        ...icons,
        { url: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
        { url: '/favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
      other: iconsOther,
    },
    openGraph: {
      title,
      description,
      siteName: SITE_NAME,
      url: canonicalUrl,
      locale: lang,
      images: [
        {
          url: imageUrl,
        },
      ],
      type: TYPE,
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: {
      index: isRobotsIndexPage,
      googleBot: {
        index: isRobotsIndexPage,
      },
    },
    verification: {
      google: GOOGLE,
      yandex: YANDEX,
    },
    other,
  };
};

export default getMetadata;
