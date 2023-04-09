import React, { useEffect } from "react";
import Head from "next/head";
import Mixpanel from "@/lib/mixpanel";
import Layout from "@/components/Layout";
import Container from "@/components/Container";
import useTranslation from "next-translate/useTranslation";

export default function Custom404() {
  const { t } = useTranslation();

  useEffect(() => {
    Mixpanel.event("LOADING_404_ERROR_PAGE");
  }, []);

  const text = {
    title: "Нет такой страницы",
  };

  return (
    <Layout>
      <Head>
        <title>My page title</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Container small>
        <h1 className="w-full text-h1 text-base-main">{text.title}</h1>
      </Container>
    </Layout>
  );
}
