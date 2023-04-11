import React, { useState, useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useAppContext } from "@/lib/context";
import Mixpanel from "@/lib/mixpanel";
import { tagsMethods, selectionsMethods } from "@/lib/api";
import Layout from "@/components/Layout";
import Container from "@/components/Container";
import Tabs from "@/components/Tabs";
import Tag from "@/components/Tag";
import Badge from "@/components/Badge";
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
        <Tabs data={linksTabs} keyName="url" display="title" selected="/selections" setSelected={(value) => router.push(value.url)} />
        <ul className="mt-[40px] flex w-full flex-col space-y-[40px]">
          {selectionList.map((item) => (
            <li className="flex w-full flex-col" key={item.id}>
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
              <div className="mt-[24px] grid gap-x-[8px] gap-y-[16px] xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1">
                {item.links
                  .sort((a, b) => new Date(b.create) - new Date(a.create))
                  .map((link) => (
                    <NextLink href={link.url} target="_blank" className="group !no-underline transition" key={link.id}>
                      <div className="flex w-full flex-col rounded-md border border-secondary-lighter px-[16px] py-[12px] !no-underline transition group-hover:border-primary-main">
                        <span className="w-full text-tm2 text-base-main !no-underline transition group-hover:text-primary-main">{link.title}</span>
                        <span className="mt-[6px] w-full text-t4 text-base-light !no-underline transition group-hover:text-base-main">{link.description}</span>
                        {link.tags.length > 0 && (
                          <ul className="mt-[8px] flex w-full flex-row flex-wrap">
                            {link.tags.map((tag) => (
                              <li className="mr-[4px] mt-[4px]" key={tag.url}>
                                <Tag
                                  title={tag.title}
                                  size="xs"
                                  theme="border"
                                  selected={activeTag !== undefined && activeTag.url === tag.url}
                                  clickHandler={() => router.push(activeTag !== undefined && activeTag.url === tag.url ? "/selections" : `/selections?tag=${tag.url}`)}
                                />
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </NextLink>
                  ))}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Layout>
  );
}
