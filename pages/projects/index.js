import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Mixpanel from "@/lib/mixpanel";
import { getTags, getProjects } from "@/lib/api";
import Layout from "@/components/Layout";
import Container from "@/components/Container";
import PageHeadline from "@/components/PageHeadline";
import { ClickableTagsList } from "@/components/Tags";
import Projects from "@/components/Projects";
import useTranslation from "next-translate/useTranslation";
import style from "./styles.module.scss";

export async function getServerSideProps(context) {
  const tags = getTags.serializer(await getTags.getList());
  const projects = getProjects.serializer(await getProjects.getList());

  return {
    props: {
      query: context.query,
      tags: tags,
      projects: projects,
    },
  };
}

export default function ProjectsPage({ query, tags, projects }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [tagList, setTagList] = useState([]);
  const [activeTag, setActiveTag] = useState(tags.filter((item) => item.url === query.tag)[0]);

  useEffect(() => {
    Mixpanel.event("LOADING_PROJECTS_PAGE");
  }, []);

  useEffect(() => {
    const activeTagsList = [];

    projects.forEach((project) => {
      project.tags.forEach((tag) => {
        if (activeTagsList.every((item) => item.url !== tag.url)) {
          activeTagsList.push(tag);
        }
      });
    });

    setTagList(activeTagsList);
  }, [projects]);

  useEffect(() => {
    setActiveTag(tags.filter((item) => item.url === router.query.tag)[0]);
  }, [router.query.tag, tags]);

  return (
    <Layout>
      <Head>
        <title>
          {t("pages:projects.title")} | {t("common:metaTitle")}
        </title>
        <meta property="og:title" content={`${t("pages:projects.title")} | ${t("common:metaTitle")}`} key="title" />
        <meta property="og:url" content={`https://prosazhin.ru${router.asPath}`} key="url" />
      </Head>
      <Container>
        <PageHeadline title={t("pages:projects.title")} />
        <Projects
          array={activeTag !== undefined ? projects.filter((project) => project.tags.some((tag) => tag.url === activeTag.url)) : projects}
          tag={activeTag !== undefined ? activeTag.url : null}
        />
      </Container>
    </Layout>
  );
}
