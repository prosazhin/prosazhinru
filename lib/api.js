import CONTENTFULAPI from "@/lib/contentful";
const api = new CONTENTFULAPI();
import dayjs from "dayjs";
import "dayjs/locale/ru";
import "dayjs/locale/en";

const checkValue = (value) => (value ? value : null);

export const competenciesMethods = {
  getList: async () =>
    await api.get("competencies-categories").then((response) =>
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
  getList: async () =>
    await api.get("tags", { order: "sys.createdAt" }).then((response) =>
      response.items.map((item) => ({
        id: checkValue(item.sys.id),
        title: checkValue(item.fields.title),
        url: checkValue(item.fields.url),
      })),
    ),
};

export const linksMethods = {
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
};

export const compilationsMethods = {
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
};

export const postsMethods = {
  getList: async () =>
    await api.get("posts").then((response) =>
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
        createString: dayjs(item.fields.create).locale("ru").format("DD MMMM YYYY"),
      })),
    ),
};

export const projectsMethods = {
  getList: async () =>
    await api.get("projects").then((response) =>
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
        createString: dayjs(item.fields.create).locale("ru").format("DD MMMM YYYY"),
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
