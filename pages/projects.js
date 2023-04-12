/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Mixpanel from "@/lib/mixpanel";
import { projectsMethods } from "@/lib/api";
import Layout from "@/components/Layout";
import Container from "@/components/Container";
import Badge from "@/components/Badge";
import Tag from "@/components/Tag";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import useTranslation from "next-translate/useTranslation";

export async function getServerSideProps(context) {
  const { locale } = context;
  const projects = await projectsMethods.getList(locale);

  return {
    props: {
      projects,
    },
  };
}

export default function ProjectsPage({ projects }) {
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    Mixpanel.event("LOADING_PROJECTS_PAGE");
  }, []);

  const linesOptions = {
    0: ["2", "2", "2"],
    1: ["3", "3"],
    2: ["2", "4"],
    3: ["4", "2"],
    4: ["6"],
  };

  const getProjectSize = (value) => {
    if (value === 2) return "desktop:col-span-2";
    if (value === 3) return "desktop:col-span-3";
    if (value === 4) return "desktop:col-span-4";
    if (value === 6) return "desktop:col-span-6";
  };

  return (
    <Layout>
      <Head>
        <title>{`${t("pages:projects.title")} | ${t("common:metaTitle")}`}</title>
        <meta property="og:title" content={`${t("pages:projects.title")} | ${t("common:metaTitle")}`} key="title" />
        <meta property="og:url" content={`https://prosazhin.ru${router.asPath}`} key="url" />
      </Head>
      <Container>
        <h1 className="mb-[24px] w-full text-h1 text-base-main">{t("pages:projects.title")}</h1>
        <ul className="grid w-full grid-cols-6 gap-x-[24px] gap-y-[40px]">
          {projects
            .sort((a, b) => a.order - b.order)
            .map((project) => (
              <li key={project.id} className={`sm:col-span-6 ${getProjectSize(project.size)}`}>
                <a className="group !no-underline transition" href={project.url} target="_blank" rel="noreferrer">
                  <div
                    className={`flex w-full flex-col items-start justify-start transition ${
                      !project.cover ? "rounded-md border border-secondary-lighter px-[24px] py-[20px] group-hover:border-primary-main" : ""
                    }`}
                  >
                    {project.cover && <img className="block w-full rounded-md" src={project.cover} alt={project.title} />}
                    {!project.cover && <span className="w-full transition text-h4 text-base-main group-hover:text-primary-main">{project.title}</span>}
                    {project.description && !project.cover && <span className="mt-[4px] w-full text-t3 text-base-light transition group-hover:text-base-main">{project.description}</span>}
                    <ul className="mt-[16px] flex w-full flex-row flex-wrap">
                      {project.resourceLinks.map((item) => (
                        <li className="mr-[4px] mt-[4px]" key={item.url}>
                          <Tag title={item.title} size="xs" theme="border" place="right" clickHandler={() => window.open(item.url, "_blank")}>
                            <ArrowLongRightIcon className="h-[16px] w-[16px]" />
                          </Tag>
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-[4px] flex w-full flex-row flex-wrap">
                      <li className="mr-[4px] mt-[4px]">
                        <Badge title={project.createString} size="xs" color="secondary" theme="light" />
                      </li>
                      {project.tags.length > 0 &&
                        project.tags.map((tag) => (
                          <li className="mr-[4px] mt-[4px]" key={tag.url}>
                            <Badge title={tag.title} size="xs" color="secondary" theme="border" />
                          </li>
                        ))}
                    </ul>
                  </div>
                </a>
              </li>
            ))}
        </ul>
      </Container>
    </Layout>
  );
}
