import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Mixpanel from "@/lib/mixpanel";
import { competenciesMethods } from "@/lib/api";
import Layout from "@/components/Layout";
import Container from "@/components/Container";
import Badge from "@/components/Badge";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import useTranslation from "next-translate/useTranslation";

export async function getServerSideProps() {
  const competenciesCategories = await competenciesMethods.getList();

  return {
    props: {
      competenciesCategories,
    },
  };
}

export default function CompetenciesPage({ competenciesCategories }) {
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    Mixpanel.event("LOADING_COMPETENCIES_PAGE");
  }, []);

  return (
    <Layout>
      <Head>
        <title>{`${t("pages:competencies.title")} | ${t("common:metaTitle")}`}</title>
        <meta property="og:title" content={`${t("pages:competencies.title")} | ${t("common:metaTitle")}`} key="title" />
        <meta property="og:url" content={`https://prosazhin.ru${router.asPath}`} key="url" />
      </Head>
      <Container small>
        <h1 className="w-full text-h1 text-base-main">{t("pages:competencies.title")}</h1>
        <p className="mt-[16px] w-full text-t1 text-base-main" dangerouslySetInnerHTML={{ __html: t("common:matrix.description") }} />
        <Disclosure as="div" className="mt-[40px] rounded-md border border-secondary-lighter px-[24px] py-[20px]">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full flex-row items-center text-left">
                <h2 className="w-full flex-1 text-h3 text-base-main">{t("common:matrix.grades.headline")}</h2>
                <ChevronUpIcon className={`${!open ? "rotate-180 transform" : ""} h-[24px] w-[24px] text-base-light`} />
              </Disclosure.Button>
              <Disclosure.Panel className="mt-[16px]">
                <ul className="flex w-full flex-col space-y-[16px]">
                  {[1, 2, 3, 4].map((item) => (
                    <li className="flex w-full flex-col space-y-[4px]" key={item}>
                      <span className="flex w-full flex-row items-center space-x-[8px] text-tm2 text-base-main">
                        <span>{t(`common:matrix.grades.${item}.title`)}</span>
                        <Badge title={item} size="xs" color="secondary" theme="light" />
                      </span>
                      <span className="w-full text-t3 text-base-main">{t(`common:matrix.grades.${item}.description`)}</span>
                    </li>
                  ))}
                </ul>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <ul className="mt-[40px] flex w-full flex-col space-y-[40px]">
          {competenciesCategories
            .sort((a, b) => a.order - b.order)
            .map((category) => (
              <li className="flex w-full flex-col" key={category.id}>
                <span className="mb-[8px] flex w-full flex-row items-center space-x-[16px] px-[16px]">
                  <span className="flex-1 text-tm2 text-base-main">{category.title}</span>
                  <Badge title={category.rating} size="xs" color="secondary" theme="border" />
                </span>
                <ul className="flex w-full flex-col divide-y divide-secondary-lighter rounded-md border border-secondary-lighter">
                  {category.competencies
                    .sort((a, b) => a.order - b.order)
                    .map((item) => (
                      <li className="flex w-full flex-row items-center space-x-[16px] px-[16px] py-[12px]" key={item.id}>
                        <span className="flex-1 text-t3 text-base-main">{item.title}</span>
                        <Badge title={item.rating} size="xs" color="secondary" theme="light" />
                      </li>
                    ))}
                </ul>
              </li>
            ))}
        </ul>
      </Container>
    </Layout>
  );
}
