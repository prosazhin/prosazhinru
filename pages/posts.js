import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Mixpanel from "@/lib/mixpanel";
import { postsMethods } from "@/lib/api";
import Layout from "@/components/Layout";
import Container from "@/components/Container";
import Badge from "@/components/Badge";
import useTranslation from "next-translate/useTranslation";

export async function getServerSideProps() {
  const posts = await postsMethods.getList();

  return {
    props: {
      posts,
    },
  };
}

export default function PostsPage({ posts }) {
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    Mixpanel.event("LOADING_POSTS_PAGE");
  }, []);

  return (
    <Layout>
      <Head>
        <title>{`${t("pages:posts.title")} | ${t("common:metaTitle")}`}</title>
        <meta property="og:title" content={`${t("pages:posts.title")} | ${t("common:metaTitle")}`} key="title" />
        <meta property="og:url" content={`https://prosazhin.ru${router.asPath}`} key="url" />
      </Head>
      <Container small>
        <h1 className="w-full text-h1 text-base-main">{t("pages:posts.title")}</h1>
        <ul className="mt-[24px] flex w-full flex-col space-y-[16px]">
          {posts
            .sort((a, b) => new Date(b.create) - new Date(a.create))
            .map((post) => (
              <li className="w-full" key={post.id}>
                <a href={post.url} target="_blank" className="group w-full !no-underline">
                  <div className="flex w-full flex-col rounded-md border border-secondary-lighter px-[24px] py-[20px] group-hover:border-primary-main">
                    <span className="w-full text-tm1 text-base-main group-hover:text-primary-main">{post.title}</span>
                    <span className="mt-[8px] w-full text-t3 text-base-main">{post.description}</span>
                    {post.tags.length > 0 && (
                      <ul className="mt-[12px] flex w-full flex-row flex-wrap">
                        {post.tags.map((tag) => (
                          <li className="mr-[4px] mt-[4px]" key={tag.url}>
                            <Badge title={tag.title} size="xs" color="secondary" theme="light" />
                          </li>
                        ))}
                      </ul>
                    )}
                    <span className="mt-[8px] w-full text-t4 text-base-light">{post.createString}</span>
                  </div>
                </a>
              </li>
            ))}
        </ul>
      </Container>
    </Layout>
  );
}
