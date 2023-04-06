import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAppContext } from "@/lib/context";
import Mixpanel from "@/lib/mixpanel";
import { getTags, getLinks } from "@/lib/api";
import Layout from "@/components/Layout";
import Container from "@/components/Container";
import PageHeadline from "@/components/PageHeadline";
import { ClickableTagsList } from "@/components/Tags";
import Links from "@/components/Links";
import { LinkTabs } from "@/components/Tabs";
import useTranslation from "next-translate/useTranslation";
import style from "./styles.module.scss";

export async function getServerSideProps(context) {
  const tags = getTags.serializer(await getTags.getList());
  const links = getLinks.serializer(await getLinks.getList());

  return {
    props: {
      query: context.query,
      tags: tags,
      links: links,
    },
  };
}

export default function LinksPage({ query, tags, links }) {
  const { t } = useTranslation();
  const router = useRouter();
  const context = useAppContext();
  const [tagList, setTagList] = useState([]);
  const [activeTag, setActiveTag] = useState(tags.filter((item) => item.url === query.tag)[0]);

  useEffect(() => {
    Mixpanel.event("LOADING_LINKS_PAGE");
  }, []);

  useEffect(() => {
    const activeTagsList = [];

    links.forEach((link) => {
      link.tags.forEach((tag) => {
        if (activeTagsList.every((item) => item.url !== tag.url)) {
          activeTagsList.push(tag);
        }
      });
    });

    setTagList(activeTagsList);
  }, [links]);

  useEffect(() => {
    setActiveTag(tags.filter((item) => item.url === router.query.tag)[0]);
  }, [router.query.tag, tags]);

  return (
    <Layout>
      <Head>
        <title>
          {t("pages:links.title")} | {t("common:metaTitle")}
        </title>
        <meta property="og:title" content={`${t("pages:links.title")} | ${t("common:metaTitle")}`} key="title" />
        <meta property="og:url" content={`https://prosazhin.ru${router.asPath}`} key="url" />
      </Head>
      <Container>
        <LinkTabs array={context.linksTabs} customClass={style.tabs} />
        <PageHeadline title={t("pages:links.title")} />
        <ClickableTagsList array={tags.filter((item) => tagList.some((tag) => item.url === tag.url))} pageLink="links" activeTag={activeTag} customClass={style.tags} />
        <Links array={activeTag !== undefined ? links.filter((link) => link.tags.some((tag) => tag.url === activeTag.url)) : links} customClass={style.links} />
      </Container>
    </Layout>
  );
}
