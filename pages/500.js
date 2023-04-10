import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Mixpanel from "@/lib/mixpanel";
import Layout from "@/components/Layout";
import Container from "@/components/Container";
import useTranslation from "next-translate/useTranslation";

export default function Custom500() {
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    Mixpanel.event("LOADING_500_ERROR_PAGE");
  }, []);

  return (
    <Layout>
      <Head>
        <title>{t("pages:500.title")}</title>
        <meta property="og:title" content={t("pages:500.title")} key="title" />
        <meta property="og:url" content={`https://prosazhin.ru${router.asPath}`} key="url" />
      </Head>
      <Container small>
        <h1 className="w-full text-h1 text-base-main">{t("pages:500.title")}</h1>
      </Container>
    </Layout>
  );
}
