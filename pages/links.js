import React, { useState, useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useAppContext } from "@/lib/context";
import Mixpanel from "@/lib/mixpanel";
import { tagsMethods, linksMethods } from "@/lib/api";
import Layout from "@/components/Layout";
import Container from "@/components/Container";
import Tabs from "@/components/Tabs";
import Tag from "@/components/Tag";
import Input from "@/components/Input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
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
  const [linkList, setLinkList] = useState([...links]);
  const [tagList, setTagList] = useState([]);
  const [activeTag, setActiveTag] = useState(tags.filter((item) => item.url === query.tag)[0]);
  const [search, setSearch] = useState("");

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

  useEffect(() => {
    let result = [...links];
    if (activeTag !== undefined) {
      result = result.filter((link) => link.tags.some((tag) => tag.url === activeTag.url));
    }
    if (search.length > 0) {
      result = result.filter(
        (link) =>
          link.title.toLowerCase().replace(/\s+/g, "").includes(search.toLowerCase().replace(/\s+/g, "")) ||
          link.description.toLowerCase().replace(/\s+/g, "").includes(search.toLowerCase().replace(/\s+/g, "")),
      );
    }
    setLinkList(result);
  }, [links, search, activeTag]);

  return (
    <Layout>
      <Head>
        <title>{`${t("pages:links.title")} | ${t("common:metaTitle")}`}</title>
        <meta property="og:title" content={`${t("pages:links.title")} | ${t("common:metaTitle")}`} key="title" />
        <meta property="og:url" content={`https://prosazhin.ru${router.asPath}`} key="url" />
      </Head>
      <Container>
        <h1 className="mb-[16px] w-full text-h1 text-base-main">{t("pages:links.title")}</h1>
        <Input place="left" placeholder={t("common:search.placeholder")} value={search} onChange={({ target }) => setSearch(target.value)}>
          <MagnifyingGlassIcon className="h-[24px] w-[24px] text-base-light" />
        </Input>
        <ul className="mb-[40px] mt-[4px] flex w-full flex-row flex-wrap">
          {tags
            .filter((item) => tagList.some((tag) => item.url === tag.url))
            .map((tag) => (
              <li className="mr-[8px] mt-[8px]" key={tag.url}>
                <Tag
                  title={tag.title}
                  size="s"
                  theme="border"
                  selected={activeTag !== undefined && activeTag.url === tag.url}
                  clickHandler={() => router.push(activeTag !== undefined && activeTag.url === tag.url ? "/links" : `/links?tag=${tag.url}`)}
                />
              </li>
            ))}
        </ul>
        <Tabs data={linksTabs} keyName="url" display="title" selected="/links" setSelected={(value) => router.push(value.url)} />
        <div className="mt-[24px] grid gap-x-[8px] gap-y-[16px] xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1">
          {linkList
            .sort((a, b) => new Date(b.create) - new Date(a.create))
            .map((link) => (
              <NextLink href={link.url} target="_blank" className="group h-auto justify-self-stretch !no-underline transition" key={link.id}>
                <div className="flex h-full w-full flex-col rounded-md border border-secondary-lighter px-[16px] py-[12px] !no-underline transition group-hover:border-primary-main">
                  <span className="w-full text-tm2 text-base-main !no-underline transition group-hover:text-primary-main">{link.title}</span>
                  <span className="mt-[6px] w-full flex-1 text-t4 text-base-light !no-underline transition group-hover:text-base-main">{link.description}</span>
                  {link.tags.length > 0 && (
                    <ul className="mt-[8px] flex w-full flex-row flex-wrap items-end justify-start">
                      {link.tags.map((tag) => (
                        <li className="mr-[4px] mt-[4px]" key={tag.url}>
                          <Tag
                            title={tag.title}
                            size="xs"
                            theme="border"
                            selected={activeTag !== undefined && activeTag.url === tag.url}
                            clickHandler={() => router.push(activeTag !== undefined && activeTag.url === tag.url ? "/links" : `/links?tag=${tag.url}`)}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </NextLink>
            ))}
        </div>
      </Container>
    </Layout>
  );
}
