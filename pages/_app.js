import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import { ContextProvider } from "@/lib/context";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  const { t, lang } = useTranslation();

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <meta name="google" content="notranslate" />
        <meta name="yandex-verification" content="dd48801ed051b178" />
        <meta name="google-site-verification" content="oXkccV9eEltz10YzICaE33ZUFtjof1E4fFLFE4EgW-0" />
        <meta name="description" content={t("common:metaDescription")} />
        <meta property="og:description" content={t("common:metaDescription")} />
        <meta property="og:locale" content={lang} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="prosazhin" />
        <meta property="og:image" content="/sharing.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta content="#ffffff" name="msapplication-TileColor" />
        <meta name="msapplication-square70x70logo" content="/favicon/mstile-70x70.png" />
        <meta name="msapplication-TileImage" content="/favicon/mstile-144x144.png" />
        <meta name="msapplication-square150x150logo" content="/favicon/mstile-150x150.png" />
        <meta name="msapplication-wide310x150logo" content="/favicon/mstile-310x150.png" />
        <meta name="msapplication-square310x310logo" content="/favicon/mstile-310x310.png" />
      </Head>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </>
  );
}
