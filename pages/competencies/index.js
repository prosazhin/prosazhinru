import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAppContext } from "@/lib/context";
import style from "./styles.module.scss";
import Mixpanel from "@/lib/mixpanel";
import { competenciesMethods } from "@/lib/api";
import Layout from "@/components/Layout";
import Container from "@/components/Container";
import Headline from "@/components/Headline";
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
  const context = useAppContext();

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
        <div className={style.about}>
          <Headline title="Уровни оценки навыков" size="2" hideMarginTop />
          <ul className={style.about__list}>
            <li className={style.about__list__item}>
              <span className={style.about__list__item__icon}>1</span>
              <span className={style.about__list__item__title}>Осведомлённость</span>
              <span className={style.about__list__item__description}>
                Понимание того, как работает специалист в этой области. Какие задачи выполняет, каков рабочий процесс и инструментарий, методы и практики, какие особенности и ограничения накладываются
                на него.
              </span>
            </li>
            <li className={style.about__list__item}>
              <span className={style.about__list__item__icon}>2</span>
              <span className={style.about__list__item__title}>Умение</span>
              <span className={style.about__list__item__description}>
                Способность решать базовые задачи в области. Доделать не очень важный кусок работ за ведущим специалистом, собрать макет или прототип на основе чужих наработок, внести осмысленные
                доработки в существующий документ и т.п.
              </span>
            </li>
            <li className={style.about__list__item}>
              <span className={style.about__list__item__icon}>3</span>
              <span className={style.about__list__item__title}>Экспертиза</span>
              <span className={style.about__list__item__description}>
                Выполнение большинства задач в области знаний. От начала до конца и, зачастую, самостоятельно. Способность разобраться в нетипичной ситуации.
              </span>
            </li>
            <li className={style.about__list__item}>
              <span className={style.about__list__item__icon}>4</span>
              <span className={style.about__list__item__title}>Лидерство</span>
              <span className={style.about__list__item__description}>
                Способность передать экспертизу другим участникам команды. Помощь в обучении и профессиональном росте коллег, развитии инструментария и методов работы, повышении общей дизайн-культуры.
                Возможность указать на проблемную ситуацию в проекте или процессе и помочь в её решении.
              </span>
            </li>
          </ul>
          <ul className={style.category}>
            {competenciesCategories
              .sort((a, b) => a.order - b.order)
              .map((category) => (
                <li className={style.category__item} key={category.id}>
                  <span className={style.category__item__title}>{category.title}</span>
                  <ul className={style.competencies}>
                    {category.competencies
                      .sort((a, b) => a.order - b.order)
                      .map((item) => (
                        <li className={style.competencies__item} key={item.id}>
                          <span className={style.competencies__item__title}>{item.title}</span>
                          <span className={style.competencies__item__rating}>{item.rating}</span>
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
          </ul>
        </div>
      </Container>
    </Layout>
  );
}
