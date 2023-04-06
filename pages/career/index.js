import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAppContext } from "@/lib/context";
import Mixpanel from "@/lib/mixpanel";
import { getJobs } from "@/lib/api";
import Layout from "@/components/Layout";
import Container from "@/components/Container";
import { LinkTabs } from "@/components/Tabs";
import useTranslation from "next-translate/useTranslation";
import style from "./styles.module.scss";

export async function getServerSideProps() {
  const jobs = getJobs.serializer(await getJobs.getList());

  return {
    props: {
      jobs: jobs,
    },
  };
}

export default function AboutPage({ jobs }) {
  const { t } = useTranslation();
  const router = useRouter();
  const context = useAppContext();

  useEffect(() => {
    Mixpanel.event("LOADING_JOBS_PAGE");
  }, []);

  return (
    <Layout>
      <Head>
        <title>
          {t("pages:career.title")} | {t("common:metaTitle")}
        </title>
        <meta property="og:title" content={`${t("pages:career.title")} | ${t("common:metaTitle")}`} key="title" />
        <meta property="og:url" content={`https://prosazhin.ru${router.asPath}`} key="url" />
      </Head>
      <Container small>
        <LinkTabs array={context.aboutTabs} customClass={style.tabs} />
        <article className={style.road}>
          {jobs
            .sort((a, b) => b.order - a.order)
            .map((job) => (
              <section className={style.road__item} key={job.id}>
                <h3 className={style.road__title}>
                  {job.link ? (
                    <a href={job.url} target="_blank" rel="noreferrer">
                      {job.title}
                    </a>
                  ) : (
                    <React.Fragment>{job.title}</React.Fragment>
                  )}
                </h3>
                <p className={style.road__date}>{job.date}</p>
                <p className={style.road__position}>{job.position}</p>
                <p className={style.road__description}>{job.description}</p>
                {Boolean(job.devStack) && <p className={style.road__description}>{job.devStack}</p>}
                {Boolean(job.designStack) && <p className={style.road__description}>{job.designStack}</p>}
              </section>
            ))}
        </article>
      </Container>
    </Layout>
  );
}
