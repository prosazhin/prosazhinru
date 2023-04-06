import { checkValue } from "@/lib/utils";
import CONTENTFULAPI from "@/lib/contentful";
const api = new CONTENTFULAPI();
import dayjs from "dayjs";
import "dayjs/locale/ru";

export const getSkills = {
  getList: async () =>
    await api.get("skills").then((response) =>
      response.items.map((item) => ({
        id: checkValue(item.sys.id),
        title: checkValue(item.fields.title),
        order: checkValue(item.fields.order),
        description: checkValue(item.fields.description),
        tools: checkValue(item.fields.tools),
      })),
    ),
};

export const getJobs = {
  getList: async () =>
    await api.get("jobs").then((response) =>
      response.items.map((item) => ({
        id: checkValue(item.sys.id),
        title: checkValue(item.fields.title),
        link: checkValue(item.fields.link),
        url: checkValue(item.fields.url),
        position: checkValue(item.fields.position),
        description: checkValue(item.fields.description),
        devStack: checkValue(item.fields.devStack),
        designStack: checkValue(item.fields.designStack),
        order: checkValue(item.fields.order),
        recruited: checkValue(item.fields.recruited),
        dismissal: checkValue(item.fields.dismissal),
        date: `${dayjs(item.fields.recruited).locale("ru").format("MMMM YYYY")} — ${item.fields.dismissal === null ? "Сейчас" : `${dayjs(item.fields.dismissal).locale("ru").format("MMMM YYYY")}`}`,
      })),
    ),
};

export const getCompetencies = {
  getList: async () =>
    await api.get("competencies-categories").then((response) =>
      response.items.map((item) => ({
        id: checkValue(item.sys.id),
        title: checkValue(item.fields.title),
        order: checkValue(item.fields.order),
        competencies: item.fields.competencies.map((competence) => ({
          id: checkValue(competence.sys.id),
          title: checkValue(competence.fields.title),
          rating: checkValue(competence.fields.rating),
          order: checkValue(competence.fields.order),
        })),
      })),
    ),
};

export const getTags = {
  getList: async () =>
    await api.get("tags", { order: "sys.createdAt" }).then((response) =>
      response.items.map((item) => ({
        id: checkValue(item.sys.id),
        title: checkValue(item.fields.title),
        url: checkValue(item.fields.url),
      })),
    ),
};

export const getLinks = {
  getList: async () =>
    await api.get("links", { limit: 500 }).then((response) =>
      response.items.map((item) => ({
        id: checkValue(item.sys.id),
        title: checkValue(item.fields.title),
        description: checkValue(item.fields.description),
        url: checkValue(item.fields.url),
        create: checkValue(item.fields.create),
        tags: item.fields.tags.map((tag) => ({
          id: checkValue(tag.sys.id),
          title: checkValue(tag.fields.title),
          url: checkValue(tag.fields.url),
        })),
      })),
    ),
  getListWithTag: async (activeTagId) =>
    await api.get("links", { limit: 500, "fields.tags.sys.id[in]": activeTagId }).then((response) =>
      response.items.map((item) => ({
        id: checkValue(item.sys.id),
        title: checkValue(item.fields.title),
        description: checkValue(item.fields.description),
        url: checkValue(item.fields.url),
        create: checkValue(item.fields.create),
        tags: item.fields.tags.map((tag) => ({
          id: checkValue(tag.sys.id),
          title: checkValue(tag.fields.title),
          url: checkValue(tag.fields.url),
        })),
      })),
    ),
};

export const getSelections = {
  getList: async () =>
    await api.get("selections").then((response) =>
      response.items.map((item) => ({
        id: checkValue(item.sys.id),
        title: checkValue(item.fields.title),
        description: checkValue(item.fields.description),
        create: checkValue(item.fields.create),
        tags: item.fields.tags.map((tag) => ({
          id: checkValue(tag.sys.id),
          title: checkValue(tag.fields.title),
          url: checkValue(tag.fields.url),
        })),
        links: item.fields.links.map((link) => ({
          id: checkValue(link.sys.id),
          title: checkValue(link.fields.title),
          description: checkValue(link.fields.description),
          url: checkValue(link.fields.url),
          create: checkValue(item.sys.createdAt),
          tags: item.fields.tags.map((tag) => ({
            id: checkValue(tag.sys.id),
            title: checkValue(tag.fields.title),
            url: checkValue(tag.fields.url),
          })),
        })),
      })),
    ),
  getListWithTag: async (activeTagId) =>
    await api.get("selections", { "fields.tags.sys.id[in]": activeTagId }).then((response) =>
      response.items.map((item) => ({
        id: checkValue(item.sys.id),
        title: checkValue(item.fields.title),
        description: checkValue(item.fields.description),
        create: checkValue(item.fields.create),
        tags: item.fields.tags.map((tag) => ({
          id: checkValue(tag.sys.id),
          title: checkValue(tag.fields.title),
          url: checkValue(tag.fields.url),
        })),
        links: item.fields.links.map((link) => ({
          id: checkValue(link.sys.id),
          title: checkValue(link.fields.title),
          description: checkValue(link.fields.description),
          url: checkValue(link.fields.url),
          create: checkValue(item.sys.createdAt),
          tags: item.fields.tags.map((tag) => ({
            id: checkValue(tag.sys.id),
            title: checkValue(tag.fields.title),
            url: checkValue(tag.fields.url),
          })),
        })),
      })),
    ),
};

export const getPosts = {
  getList: async () =>
    await api.get("posts").then((response) =>
      response.items.map((item) => ({
        id: checkValue(item.sys.id),
        slug: checkValue(item.fields.slug),
        title: checkValue(item.fields.title),
        description: checkValue(item.fields.description),
        tags: item.fields.tags.map((tag) => ({
          id: checkValue(tag.sys.id),
          title: checkValue(tag.fields.title),
          url: checkValue(tag.fields.url),
        })),
        create: checkValue(item.fields.create),
        createString: dayjs(item.fields.create).locale("ru").format("DD MMMM YYYY"),
        mediumUrl: checkValue(item.fields.mediumUrl),
      })),
    ),
  getListWithTag: async (activeTagId) =>
    await api.get("posts", { "fields.tags.sys.id[in]": activeTagId }).then((response) =>
      response.items.map((item) => ({
        id: checkValue(item.sys.id),
        slug: checkValue(item.fields.slug),
        title: checkValue(item.fields.title),
        description: checkValue(item.fields.description),
        tags: item.fields.tags.map((tag) => ({
          id: checkValue(tag.sys.id),
          title: checkValue(tag.fields.title),
          url: checkValue(tag.fields.url),
        })),
        create: checkValue(item.fields.create),
        createString: dayjs(item.fields.create).locale("ru").format("DD MMMM YYYY"),
        mediumUrl: checkValue(item.fields.mediumUrl),
      })),
    ),
};

export const getProjects = {
  getList: async () =>
    await api.get("projects").then((response) =>
      response.items.map((item) => ({
        id: checkValue(item.sys.id),
        title: checkValue(item.fields.title),
        description: checkValue(item.fields.description),
        url: checkValue(item.fields.url),
        tags: item.fields.tags.map((tag) => ({
          id: checkValue(tag.sys.id),
          title: checkValue(tag.fields.title),
          url: checkValue(tag.fields.url),
        })),
        cover: checkValue(item.fields.cover),
        create: checkValue(item.fields.create),
        createString: dayjs(item.fields.create).locale("ru").format("DD MMMM YYYY"),
        gitUrl: checkValue(item.fields.gitUrl),
        figmaUrl: checkValue(item.fields.figmaUrl),
        figmaCommunityUrl: checkValue(item.fields.figmaCommunityUrl),
        behanceUrl: checkValue(item.fields.behanceUrl),
        projectUrl: checkValue(item.fields.projectUrl),
      })),
    ),
  getListWithTag: async (activeTagId) =>
    await api.get("projects", { "fields.tags.sys.id[in]": activeTagId }).then((response) =>
      response.items.map((item) => ({
        id: checkValue(item.sys.id),
        title: checkValue(item.fields.title),
        description: checkValue(item.fields.description),
        url: checkValue(item.fields.url),
        tags: item.fields.tags.map((tag) => ({
          id: checkValue(tag.sys.id),
          title: checkValue(tag.fields.title),
          url: checkValue(tag.fields.url),
        })),
        cover: checkValue(item.fields.cover),
        create: checkValue(item.fields.create),
        createString: dayjs(item.fields.create).locale("ru").format("DD MMMM YYYY"),
        gitUrl: checkValue(item.fields.gitUrl),
        figmaUrl: checkValue(item.fields.figmaUrl),
        figmaCommunityUrl: checkValue(item.fields.figmaCommunityUrl),
        behanceUrl: checkValue(item.fields.behanceUrl),
        projectUrl: checkValue(item.fields.projectUrl),
      })),
    ),
};
