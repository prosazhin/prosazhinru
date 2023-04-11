import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAppContext } from "@/lib/context";
import Mixpanel from "@/lib/mixpanel";
import { tagsMethods, selectionsMethods } from "@/lib/api";
import Layout from "@/components/Layout";
import Container from "@/components/Container";
import Tabs from "@/components/Tabs";
import Tag from "@/components/Tag";
import Badge from "@/components/Badge";
import Links from "@/components/Links";
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
  const { linksTabs } = useAppContext();
  const [selectionList, setSelectionList] = useState([...selections]);
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

  useEffect(() => {
    if (activeTag !== undefined) {
      setSelectionList(selections.filter((selection) => selection.tags.some((tag) => tag.url === activeTag.url)));
    }
  }, [activeTag, selections]);

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
                <Tag
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
        <Tabs data={linksTabs} keyName="url" display="title" selected="/selections" setSelected={(value) => router.push(value.url)} customClass="mb-[32px]" />
        <ul className="mt-[40px] flex w-full flex-col space-y-[40px]">
          {selectionList.map((item) => (
            <li className="flex flex-col w-full" key={item.id}>
              <span className="w-full text-h2 text-base-main">{item.title}</span>
              <span className="mt-[6px] w-full text-t2 text-base-light">{item.description}</span>
              {item.tags.length > 0 && (
                <ul className="mt-[12px] flex w-full flex-row flex-wrap">
                  {item.tags.map((tag) => (
                    <li className="mr-[4px] mt-[4px]" key={tag.url}>
                      <Badge title={tag.title} size="xs" color="secondary" theme="border" />
                    </li>
                  ))}
                </ul>
              )}
              <Links array={item.links} customClass="mt-[24px]" />
            </li>
          ))}
        </ul>
      </Container>
    </Layout>
  );
}
