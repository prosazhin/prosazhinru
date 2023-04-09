import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAppContext } from "@/lib/context";
import Mixpanel from "@/lib/mixpanel";
import { tagsMethods, selectionsMethods } from "@/lib/api";
import Layout from "@/components/Layout";
import Container from "@/components/Container";
import Selections from "@/components/Selections";
import Tabs from "@/components/Tabs";
import NewTag from "@/components/NewTag";
import useTranslation from "next-translate/useTranslation";

export async function getServerSideProps(context) {
  const tags = await tagsMethods.getList();
  const selections = await selectionsMethods.getList();

  return {
    props: {
      query: context.query,
      tags,
      selections,
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
        <title>{`${t("pages:selections.title")} | ${t("common:metaTitle")}`}</title>
        <meta property="og:title" content={`${t("pages:selections.title")} | ${t("common:metaTitle")}`} key="title" />
        <meta property="og:url" content={`https://prosazhin.ru${router.asPath}`} key="url" />
      </Head>
      <Container>
        <h1 className="w-full text-h1 text-base-main">{t("pages:selections.title")}</h1>
        <ul className="mb-[40px] mt-[8px] flex w-full flex-row flex-wrap">
          {tags
            .filter((item) => tagList.some((tag) => item.url === tag.url))
            .map((tag) => (
              <li className="mr-[8px] mt-[8px]" key={tag.url}>
                <NewTag
                  title={tag.title}
                  size="s"
                  theme="border"
                  place="right"
                  selected={activeTag !== undefined && activeTag.url === tag.url}
                  clickHandler={() => router.push(activeTag !== undefined && activeTag.url === tag.url ? "/selections" : `/selections?tag=${tag.url}`)}
                />
              </li>
            ))}
        </ul>
        <Tabs data={context.linksTabs} keyName="url" display="title" selected="/selections" setSelected={(value) => router.push(value.url)} customClass="mb-[32px]" />
        <Selections array={activeTag !== undefined ? selections.filter((selection) => selection.tags.some((tag) => tag.url === activeTag.url)) : selections} />
      </Container>
    </Layout>
  );
}
