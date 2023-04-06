import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Mixpanel from "@/lib/mixpanel";
import { getTags, getPosts } from "@/lib/api";
import Layout from "@/components/Layout";
import Container from "@/components/Container";
import PageHeadline from "@/components/PageHeadline";
import Posts from "@/components/Posts";
import ClickableTagsList from "@/components/ClickableTagsList";
import useTranslation from "next-translate/useTranslation";
import style from "./styles.module.scss";

export async function getServerSideProps(context) {
  const tags = getTags.serializer(await getTags.getList());
  const posts = getPosts.serializer(await getPosts.getList());

  return {
    props: {
      query: context.query,
      tags: tags,
      posts: posts,
    },
  };
}

export default function PostsPage({ query, tags, posts }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [tagList, setTagList] = useState([]);
  const [activeTag, setActiveTag] = useState(tags.filter((item) => item.url === query.tag)[0]);

  useEffect(() => {
    Mixpanel.event("LOADING_POSTS_PAGE");
  }, []);

  useEffect(() => {
    const activeTagsList = [];

    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        if (activeTagsList.every((item) => item.url !== tag.url)) {
          activeTagsList.push(tag);
        }
      });
    });

    setTagList(activeTagsList);
  }, [posts]);

  useEffect(() => {
    setActiveTag(tags.filter((item) => item.url === router.query.tag)[0]);
  }, [router.query.tag, tags]);

  return (
    <Layout>
      <Head>
        <title>
          {t("pages:posts.title")} | {t("common:metaTitle")}
        </title>
        <meta property="og:title" content={`${t("pages:posts.title")} | ${t("common:metaTitle")}`} key="title" />
        <meta property="og:url" content={`https://prosazhin.ru${router.asPath}`} key="url" />
      </Head>
      <Container small>
        <PageHeadline title={t("pages:posts.title")} />
        <ClickableTagsList array={tags.filter((item) => tagList.some((tag) => item.url === tag.url))} pageLink="posts" activeTag={activeTag} customClass={style.tags} />
        <Posts array={activeTag !== undefined ? posts.filter((post) => post.tags.some((tag) => tag.url === activeTag.url)) : posts} />
      </Container>
    </Layout>
  );
}
