import CONTENTFULAPI from "@/lib/contentful";
const api = new CONTENTFULAPI();
import { getFormatDate } from "@/lib/utils";

const checkValue = (value) => (value ? value : null);

export const competenciesMethods = {
  getList: async (lang) =>
    await api.get("competencies-categories", { locale: lang }).then((response) =>
      response.items.map((item) => ({
        id: checkValue(item.sys.id),
        title: checkValue(item.fields.title),
        order: checkValue(item.fields.order),
        rating: checkValue(item.fields.rating),
        competencies: item.fields.competencies.map((competence) => ({
          id: checkValue(competence.sys.id),
          title: checkValue(competence.fields.title),
          rating: checkValue(competence.fields.rating),
          order: checkValue(competence.fields.order),
        })),
      })),
    ),
};

export const tagsMethods = {
  getList: async (lang) =>
    await api.get("tags", { order: "sys.createdAt", locale: lang }).then((response) =>
      response.items.map((item) => ({
        id: checkValue(item.sys.id),
        title: checkValue(item.fields.title),
        url: checkValue(item.fields.url),
      })),
    ),
};

export const linksMethods = {
  getList: async (lang) =>
    await api.get("links", { limit: 500, locale: lang }).then((response) =>
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

export const compilationsMethods = {
  getList: async (lang) =>
    await api.get("selections", { locale: lang }).then((response) =>
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

export const postsMethods = {
  getList: async (lang) =>
    await api.get("posts", { locale: lang }).then((response) =>
      response.items.map((item) => ({
        id: checkValue(item.sys.id),
        url: checkValue(item.fields.url),
        title: checkValue(item.fields.title),
        description: checkValue(item.fields.description),
        tags: item.fields.tags.map((tag) => ({
          id: checkValue(tag.sys.id),
          title: checkValue(tag.fields.title),
          url: checkValue(tag.fields.url),
        })),
        create: checkValue(item.fields.create),
        createString: getFormatDate(item.fields.create, lang),
      })),
    ),
};

export const projectsMethods = {
  getList: async (lang) =>
    await api.get("projects", { locale: lang }).then((response) =>
      response.items.map((item) => ({
        id: checkValue(item.sys.id),
        title: checkValue(item.fields.title),
        description: checkValue(item.fields.description),
        order: checkValue(item.fields.order),
        size: checkValue(item.fields.size),
        url: checkValue(item.fields.url),
        tags: item.fields.tags.map((tag) => ({
          id: checkValue(tag.sys.id),
          title: checkValue(tag.fields.title),
          url: checkValue(tag.fields.url),
        })),
        cover: checkValue(item.fields.cover),
        create: checkValue(item.fields.create),
        createString: getFormatDate(item.fields.create, lang),
        resourceLinks: item.fields.resourceLinks.map((link) => ({
          id: checkValue(link.sys.id),
          title: checkValue(link.fields.title),
          url: checkValue(link.fields.url),
        })),
        gitUrl: checkValue(item.fields.gitUrl),
        figmaUrl: checkValue(item.fields.figmaUrl),
        figmaCommunityUrl: checkValue(item.fields.figmaCommunityUrl),
        behanceUrl: checkValue(item.fields.behanceUrl),
        projectUrl: checkValue(item.fields.projectUrl),
      })),
    ),
};
