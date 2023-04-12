import { createContext, useContext, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { ucFirst, getFormatJobDate, getDiffJobDate } from "@/lib/utils";

const AppContext = createContext();

export function ContextProvider({ children }) {
  const { t } = useTranslation();
  const [isActiveMenu, setIsActiveMenu] = useState(false);

  const state = {
    isActiveMenu: isActiveMenu,
    setIsActiveMenu: (value) => setIsActiveMenu(value),
    nav: [
      {
        title: t("common:nav.projects"),
        url: "/projects",
        active: ["/projects"],
      },
      {
        title: t("common:nav.links"),
        url: "/links",
        active: ["/links", "/selections"],
      },
      {
        title: t("common:nav.posts"),
        url: "/posts",
        active: ["/posts"],
      },
      {
        title: t("common:nav.about"),
        url: "/",
        active: ["/", "/career", "/competencies"],
      },
    ],
    contacts: [
      {
        title: "prosazhin@gmail.com",
        url: "mailto:prosazhin@gmail.com",
        link: false,
      },
      {
        title: "Telegram",
        url: "https://t.me/prosazhin",
        link: true,
      },
      {
        title: "LinkedIn",
        url: "https://www.linkedin.com/in/prosazhin",
        link: true,
      },
      {
        title: "Behance",
        url: "https://www.behance.net/prosazhin",
        link: true,
      },
      {
        title: "GitHub",
        url: "https://github.com/prosazhin",
        link: true,
      },
      {
        title: "Medium",
        url: "https://medium.com/@prosazhin",
        link: true,
      },
      {
        title: "Figma Community",
        url: "https://www.figma.com/@prosazhin",
        link: true,
      },
    ],
    linksTabs: [
      {
        title: t("common:linksTabs.links"),
        url: "/links",
      },
      {
        title: t("common:linksTabs.selections"),
        url: "/selections",
      },
    ],
    aboutTabs: [
      {
        title: t("common:aboutTabs.about"),
        url: "/",
      },
      {
        title: t("common:aboutTabs.career"),
        url: "/career",
      },
    ],
    skills: [
      {
        title: "",
        description: t("common:skills.about"),
        tools: [],
        matrix: false,
      },
      {
        title: t("common:skills.design.title"),
        description: t("common:skills.design.description"),
        tools: ["Figma", "Abode CC", "Miro", "Notion", "Google Analytics", "Yandex.Metrika", "Amplitude", "Mixpanel"],
        matrix: {
          title: t("common:skills.design.matrix"),
          url: "/competencies",
        },
      },
      {
        title: t("common:skills.frontend.title"),
        description: t("common:skills.design.description"),
        tools: ["JavaScript", "TypeScript", "NodeJS", "Npm", "Yarn", "Webpack", "React", "Redux", "Hooks", "Next", "Vue", "Vuex", "Vue 3", "Nuxt"],
        matrix: false,
      },
      {
        title: t("common:skills.html.title"),
        description: t("common:skills.design.description"),
        tools: ["HTML", "CSS", "Less", "SCSS", "PostCSS", "TailwindCSS"],
        matrix: false,
      },
      {
        title: t("common:skills.dev.title"),
        description: t("common:skills.design.description"),
        tools: ["VSCode", "Terminal", "Git", "Docker", "Nginx", "Headless CMS", "CI/CD"],
        matrix: false,
      },
    ],
    career: [
      {
        title: t("common:career.ipgate.title"),
        url: "https://ipgate.io/",
        link: true,
        position: t("common:career.ipgate.position"),
        description: t("common:career.ipgate.description"),
        devStack: ["JavaScript", "Vue", "Vuex", "Quasar", "TypeScript", "HTML", "CSS", "SCSS"],
        designStack: ["Figma"],
        date: `${ucFirst(getFormatJobDate("2022-10-19", "ru"))} — ${ucFirst(getFormatJobDate("2023-03-31", "ru"))}, ${getDiffJobDate("2022-10-19", "2023-03-31", "ru")}`,
      },
      {
        title: t("common:career.sellmonitor.title"),
        url: "https://sellmonitor.com/",
        link: true,
        position: t("common:career.sellmonitor.position"),
        description: t("common:career.sellmonitor.description"),
        devStack: ["JavaScript", "React", "TypeScript", "HTML", "CSS", "TailwindCSS"],
        designStack: ["Figma", "Miro"],
        date: `${ucFirst(getFormatJobDate("2021-12-20", "ru"))} — ${ucFirst(getFormatJobDate("2022-09-22", "ru"))}, ${getDiffJobDate("2021-12-20", "2022-09-22", "ru")}`,
      },
      {
        title: t("common:career.regru.title"),
        url: "https://www.reg.ru/",
        link: true,
        position: t("common:career.regru.position"),
        description: t("common:career.regru.description"),
        devStack: ["JavaScript", "Vue", "Vuex", "GraphQL", "TypeScript", "HTML", "CSS", "Less"],
        designStack: ["Figma", "Miro", "Notion"],
        date: `${ucFirst(getFormatJobDate("2018-10-01", "ru"))} — ${ucFirst(getFormatJobDate("2021-12-17", "ru"))}, ${getDiffJobDate("2018-10-01", "2021-12-17", "ru")}`,
      },
      {
        title: t("common:career.suplbiz.title"),
        url: "https://supl.biz/",
        link: true,
        position: t("common:career.suplbiz.position"),
        description: t("common:career.suplbiz.description"),
        devStack: ["JavaScript", "React", "Redux", "HTML", "CSS", "Less", "PostCSS"],
        designStack: ["Figma", "Adobe Photoshop"],
        date: `${ucFirst(getFormatJobDate("2016-10-01", "ru"))} — ${ucFirst(getFormatJobDate("2018-10-01", "ru"))}, ${getDiffJobDate("2016-10-01", "2018-10-01", "ru")}`,
      },
      {
        title: t("common:career.franbazar.title"),
        url: "http://franbazar.com/",
        link: true,
        position: t("common:career.franbazar.position"),
        description: t("common:career.franbazar.description"),
        devStack: ["JavaScript", "HTML", "CSS", "Less"],
        designStack: ["Figma", "Adobe Photoshop", "Adobe Illustrator"],
        date: `${ucFirst(getFormatJobDate("2016-05-01", "ru"))} — ${ucFirst(getFormatJobDate("2016-10-01", "ru"))}, ${getDiffJobDate("2016-05-01", "2016-10-01", "ru")}`,
      },
      {
        title: t("common:career.pixlpark.title"),
        url: "https://pixlpark.ru/",
        link: true,
        position: t("common:career.pixlpark.position"),
        description: t("common:career.pixlpark.description"),
        devStack: ["JavaScript", "HTML", "CSS"],
        designStack: ["Adobe Photoshop", "Adobe Illustrator"],
        date: `${ucFirst(getFormatJobDate("2014-02-01", "ru"))} — ${ucFirst(getFormatJobDate("2016-05-01", "ru"))}, ${getDiffJobDate("2014-02-01", "2016-05-01", "ru")}`,
      },
      {
        title: t("common:career.freelance.title"),
        url: "",
        link: false,
        position: t("common:career.freelance.position"),
        description: t("common:career.freelance.description"),
        devStack: [],
        designStack: ["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign"],
        date: `${ucFirst(getFormatJobDate("2011-01-01", "ru"))} — ${ucFirst(getFormatJobDate("2014-02-01", "ru"))}, ${getDiffJobDate("2011-01-01", "2014-02-01", "ru")}`,
      },
    ],
  };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
