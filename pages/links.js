import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAppContext } from "@/lib/context";
import Mixpanel from "@/lib/mixpanel";
import { tagsMethods, linksMethods } from "@/lib/api";
import Layout from "@/components/Layout";
import Container from "@/components/Container";
import Links from "@/components/Links";
import Tabs from "@/components/Tabs";
import Tag from "@/components/Tag";
import useTranslation from "next-translate/useTranslation";

export async function getServerSideProps(context) {
  const tags = await tagsMethods.getList();
  const links = await linksMethods.getList();

  return {
    props: {
      query: context.query,
      tags,
      links,
    },
  };
}

export default function LinksPage({ query, tags, links }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { linksTabs } = useAppContext();
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
        <title>{`${t("pages:links.title")} | ${t("common:metaTitle")}`}</title>
        <meta property="og:title" content={`${t("pages:links.title")} | ${t("common:metaTitle")}`} key="title" />
        <meta property="og:url" content={`https://prosazhin.ru${router.asPath}`} key="url" />
      </Head>
      <Container>
        <h1 className="w-full text-h1 text-base-main">{t("pages:links.title")}</h1>
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
                  clickHandler={() => router.push(activeTag !== undefined && activeTag.url === tag.url ? "/links" : `/links?tag=${tag.url}`)}
                />
              </li>
            ))}
        </ul>
        <Tabs data={linksTabs} keyName="url" display="title" selected="/links" setSelected={(value) => router.push(value.url)} customClass="mb-[32px]" />
        <Links array={activeTag !== undefined ? links.filter((link) => link.tags.some((tag) => tag.url === activeTag.url)) : links} />
      </Container>
    </Layout>
  );
}
