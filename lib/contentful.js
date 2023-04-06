import { createClient } from "contentful";

export default class API {
  constructor() {
    this.client = createClient({
      space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
      accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
    });
  }

  async get(contentType, params) {
    return await this.client
      .getEntries({
        content_type: contentType,
        order: "-sys.createdAt",
        ...params,
      })
      .then((response) => response);
  }

  async getOne(params) {
    return await this.client.getEntry(params).then((response) => response);
  }
}
