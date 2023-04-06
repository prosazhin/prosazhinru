import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAppContext } from "@/lib/context";
import Mixpanel from "@/lib/mixpanel";
import { getSkills } from "@/lib/api";
import Layout from "@/components/Layout";
import Container from "@/components/Container";
import Headline from "@/components/Headline";
import { LinkTabs } from "@/components/Tabs";
import useTranslation from "next-translate/useTranslation";

export async function getServerSideProps() {
  const skills = await getSkills.getList();

  return {
    props: {
      skills,
    },
  };
}

export default function HomePage({ skills }) {
  const { t } = useTranslation();
  const router = useRouter();
  const context = useAppContext();

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
        <LinkTabs array={context.aboutTabs} />
        {skills
          .sort((a, b) => a.order - b.order)
          .map((skill) => (
            <section key={skill.id}>
              <Headline title={skill.title} size="2" hideMarginTop />
              <p>{skill.description}</p>
              {skill.tools && (
                <React.Fragment>
                  <h5>Инструменты</h5>
                  <p>{skill.tools}</p>
                </React.Fragment>
              )}
            </section>
          ))}
      </Container>
    </Layout>
  );
}
