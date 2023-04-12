import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppContext } from "@/lib/context";
import Mixpanel from "@/lib/mixpanel";
import Layout from "@/components/Layout";
import Container from "@/components/Container";
import Tabs from "@/components/Tabs";
import Badge from "@/components/Badge";
import Tag from "@/components/Tag";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import useTranslation from "next-translate/useTranslation";

export default function HomePage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { contacts, aboutTabs, skills } = useAppContext();

  useEffect(() => {
    Mixpanel.event("LOADING_MAIN_PAGE");
  }, []);

  return (
    <Layout>
      <Head>
        <title>{t("common:metaTitle")}</title>
        <meta property="og:title" content={t("common:metaTitle")} key="title" />
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
        <Tabs data={aboutTabs} keyName="url" display="title" selected="/" setSelected={(value) => router.push(value.url)} customClass="mt-[80px]" />
        <ul className="mt-[40px] flex flex-col space-y-[40px]">
          {skills.map((skill, index) => (
            <li className="flex w-full flex-col" key={index}>
              {skill.title.length > 0 && <h2 className="w-full text-tm1 text-base-main">{skill.title}</h2>}
              <p className="mt-[4px] w-full text-t2 text-base-main">{skill.description}</p>
              {skill.tools.length > 0 && (
                <ul className="mt-[12px] flex w-full flex-row flex-wrap">
                  {skill.tools.map((tool) => (
                    <li className="mr-[4px] mt-[4px]" key={tool}>
                      <Badge title={tool} size="xs" color="secondary" theme="light" />
                    </li>
                  ))}
                </ul>
              )}
              {skill.matrix && (
                <Link href={skill.matrix.url} target="_self" className="group mt-[24px] bg-white text-tm2 text-base-main !no-underline transition">
                  <div className="flex w-full flex-row items-center rounded-md border border-secondary-lighter px-[24px] py-[16px] transition group-hover:border-primary-main">
                    <span className="flex-1 group-hover:text-primary-main">{skill.matrix.title}</span>
                    <ArrowRightIcon className="h-[24px] w-[24px] group-hover:text-primary-main" />
                  </div>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </Layout>
  );
}
