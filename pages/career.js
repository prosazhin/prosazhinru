import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAppContext } from "@/lib/context";
import Mixpanel from "@/lib/mixpanel";
import Layout from "@/components/Layout";
import Container from "@/components/Container";
import Tabs from "@/components/Tabs";
import Tag from "@/components/Tag";
import Badge from "@/components/Badge";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import useTranslation from "next-translate/useTranslation";

export default function CareerPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { contacts, aboutTabs, career } = useAppContext();

  useEffect(() => {
    Mixpanel.event("LOADING_JOBS_PAGE");
  }, []);

  return (
    <Layout>
      <Head>
        <title>{`${t("pages:career.title")} | ${t("common:metaTitle")}`}</title>
        <meta property="og:title" content={`${t("pages:career.title")} | ${t("common:metaTitle")}`} key="title" />
        <meta property="og:url" content={`https://prosazhin.ru${router.asPath}`} key="url" />
      </Head>
      <Container small>
        <h1 className="text-t1 text-base-main">{t("common:index.headline.1")}</h1>
        <p className="mt-[16px] text-t1 text-base-main" dangerouslySetInnerHTML={{ __html: t("common:index.headline.2") }} />
        <ul className="mt-[24px] flex w-full flex-row flex-wrap">
          {contacts.map((contact) => (
            <li className="mr-[8px] mt-[8px]" key={contact.url}>
              {contact.link ? (
                <Tag title={contact.title} size="s" theme="border" place="right" clickHandler={() => window.open(contact.url, "_blank")}>
                  <ArrowRightIcon className="h-[16px] w-[16px]" />
                </Tag>
              ) : (
                <Badge title={contact.title} size="s" color="secondary" theme="border" />
              )}
            </li>
          ))}
        </ul>
        <Tabs data={aboutTabs} keyName="url" display="title" selected="/career" setSelected={(value) => router.push(value.url)} customClass="mt-[80px]" />
        <article className="mt-[40px] flex w-full flex-col space-y-[40px]">
          {career.map((job) => (
            <section className="flex flex-col w-full" key={job.url}>
              <h3 className="w-full text-h2 text-base-main">
                {job.link ? (
                  <a href={job.url} target="_blank" rel="noreferrer" className="!no-underline transition">
                    {job.title}
                  </a>
                ) : (
                  <>{job.title}</>
                )}
              </h3>
              <span className="mt-[8px] w-full text-t3 text-base-light">{job.date}</span>
              <span className="mt-[16px] w-full text-tm2 text-base-main">{job.position}</span>
              <span className="mb-[12px] mt-[4px] w-full text-t3 text-base-main">{job.description}</span>
              {job.devStack.length > 0 && (
                <ul className="flex flex-row flex-wrap w-full">
                  {job.devStack.map((tool) => (
                    <li className="mr-[4px] mt-[4px]" key={tool}>
                      <Badge title={tool} size="xs" color="secondary" theme="light" />
                    </li>
                  ))}
                </ul>
              )}
              {job.designStack.length > 0 && (
                <ul className="flex flex-row flex-wrap w-full">
                  {job.designStack.map((tool) => (
                    <li className="mr-[4px] mt-[4px]" key={tool}>
                      <Badge title={tool} size="xs" color="secondary" theme="light" />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>
      </Container>
    </Layout>
  );
}
