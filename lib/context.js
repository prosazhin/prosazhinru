import { createContext, useContext, useState } from "react";
import useTranslation from "next-translate/useTranslation";

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
        title: "ipgate.io",
        url: "https://ipgate.io/",
        link: true,
        position: "Фронтенд разработчик / Дизайнер",
        description: "Доработка клиентской части для запуска проекта. Поддержка работы проекта. Рефакторинг фронтенда и дизайна.",
        devStack: ["JavaScript", "Vue", "Vuex", "Quasar", "TypeScript", "HTML", "CSS", "SCSS"],
        designStack: ["Figma"],
        recruited: "2022-10-19",
        dismissal: "2023-03-31",
        date: "Октябрь 2022 — Март 2023",
      },
      {
        title: "sellmonitor.com",
        url: "https://sellmonitor.com/",
        link: true,
        position: "Фронтенд разработчик / Дизайнер",
        description: "Проектирование и разработка интерфейса продукта.",
        devStack: ["JavaScript", "React", "TypeScript", "HTML", "CSS", "TailwindCSS"],
        designStack: ["Figma", "Miro"],
        recruited: "2021-12-20",
        dismissal: "2022-09-22",
        date: "Декабрь 2021 — Сентябрь 2022",
      },
      {
        title: "reg.ru",
        url: "https://www.reg.ru/",
        link: true,
        position: "Дизайнер / Фронтенд разработчик",
        description: "Поддержка и развитие доменного направления и других частей сервиса. Проектирование и разработка внутренних проектов.",
        devStack: ["JavaScript", "Vue", "Vuex", "GraphQL", "TypeScript", "HTML", "CSS", "Less"],
        designStack: ["Figma", "Miro", "Notion"],
        recruited: "2018-10-01",
        dismissal: "2021-12-17",
        date: "Октябрь 2018 — Декабрь 2021",
      },
      {
        title: "supl.biz",
        url: "https://supl.biz/",
        link: true,
        position: "Дизайнер / Фронтенд разработчик",
        description: "Проектирование и разработка торговой площадки и внутренних проектов компании.",
        devStack: ["JavaScript", "React", "Redux", "HTML", "CSS", "Less", "PostCSS"],
        designStack: ["Figma", "Adobe Photoshop"],
        recruited: "2016-10-01",
        dismissal: "2018-10-01",
        date: "Октябрь 2016 — Октябрь 2018",
      },
      {
        title: "franbazar.com",
        url: "http://franbazar.com/",
        link: true,
        position: "Дизайнер / Верстальщик",
        description: "Дизайн и верстка новых проектов и мобильных приложений на WebView. Поддержка существующих проектов.",
        devStack: ["JavaScript", "HTML", "CSS", "Less"],
        designStack: ["Figma", "Adobe Photoshop", "Adobe Illustrator"],
        recruited: "2016-05-01",
        dismissal: "2016-10-01",
        date: "Май 2016 — Октябрь 2016",
      },
      {
        title: "pixlpark.ru",
        url: "https://pixlpark.ru/",
        link: true,
        position: "Дизайнер / Верстальщик",
        description: "Поддержка и развитие демонстрационного сайта магазина полиграфии. Помощь новым и постоянным клиентам.",
        devStack: ["JavaScript", "HTML", "CSS"],
        designStack: ["Adobe Photoshop", "Adobe Illustrator"],
        recruited: "2014-02-01",
        dismissal: "2016-05-01",
        date: "Февраль 2014 — Май 2016",
      },
      {
        title: "Фриланс и типографии",
        url: "",
        link: false,
        position: "Дизайнер",
        description: "Верстка книг, газет и журналов. Графический дизайн. Рекламная полиграфия.",
        devStack: [],
        designStack: ["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign"],
        recruited: "2011-01-01",
        dismissal: "2014-02-01",
        date: "Январь 2011 — Февраль 2014",
      },
    ],
  };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
