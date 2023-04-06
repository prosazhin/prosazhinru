import { createContext, useContext, useState } from "react";
import useTranslation from "next-translate/useTranslation";

const AppContext = createContext();

export function ContextProvider({ children }) {
  const { t } = useTranslation();
  const [isActiveMenu, toggleActiveMenu] = useState(false);

  const state = {
    nav: [
      {
        title: t("common:nav.projects"),
        url: "projects",
        active: ["projects"],
      },
      {
        title: t("common:nav.links"),
        url: "links",
        active: ["links", "selections"],
      },
      {
        title: t("common:nav.posts"),
        url: "posts",
        active: ["posts"],
      },
      {
        title: t("common:nav.about"),
        url: "",
        active: [""],
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
    isActiveMenu: isActiveMenu,
    toggleActiveMenu: () => toggleActiveMenu(!isActiveMenu),
  };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
