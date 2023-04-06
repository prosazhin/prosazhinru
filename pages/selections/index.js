import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAppContext } from "@/lib/context";
import Mixpanel from "@/lib/mixpanel";
import { getTags, getSelections } from "@/lib/api";
import Layout from "@/components/Layout";
import Container from "@/components/Container";
import PageHeadline from "@/components/PageHeadline";
import ClickableTagsList from "@/components/ClickableTagsList";
import Selections from "@/components/Selections";
import LinkTabs from "@/components/LinkTabs";
import useTranslation from "next-translate/useTranslation";
import style from "./styles.module.scss";

export async function getServerSideProps(context) {
  const tags = getTags.serializer(await getTags.getList());
  const selections = getSelections.serializer(await getSelections.getList());

  return {
    props: {
      query: context.query,
      tags: tags,
      selections: selections,
    },
  };
}

export default function SelectionsPage({ query, tags, selections }) {
  const { t } = useTranslation();
  const router = useRouter();
  const context = useAppContext();
  const [tagList, setTagList] = useState([]);
  const [activeTag, setActiveTag] = useState(tags.filter((item) => item.url === query.tag)[0]);

  useEffect(() => {
    Mixpanel.event("LOADING_SELECTIONS_PAGE");
  }, []);

  useEffect(() => {
    const activeTagsList = [];

    selections.forEach((selection) => {
      selection.tags.forEach((tag) => {
        if (activeTagsList.every((item) => item.url !== tag.url)) {
          activeTagsList.push(tag);
        }
      });
    });

    setTagList(activeTagsList);
  }, [selections]);

  useEffect(() => {
    setActiveTag(tags.filter((item) => item.url === router.query.tag)[0]);
  }, [router.query.tag, tags]);

  return (
    <Layout>
      <Head>
        <title>
          {t("pages:selections.title")} | {t("common:metaTitle")}
        </title>
        <meta property="og:title" content={`${t("pages:selections.title")} | ${t("common:metaTitle")}`} key="title" />
        <meta property="og:url" content={`https://prosazhin.ru${router.asPath}`} key="url" />
      </Head>
      <Container>
        <LinkTabs array={context.linksTabs} customClass={style.tabs} />
        <PageHeadline title={t("pages:selections.title")} />
        <ClickableTagsList array={tags.filter((item) => tagList.some((tag) => item.url === tag.url))} pageLink="selections" activeTag={activeTag} customClass={style.tags} />
        <Selections array={activeTag !== undefined ? selections.filter((selection) => selection.tags.some((tag) => tag.url === activeTag.url)) : selections} />
      </Container>
    </Layout>
  );
}
