import { client } from "./client.ts";

export type rawAttachment = {
  "id": string;
  "mime": string;
  "filename": string;
  "size": number;
  "width": number;
  "height": number;
};

export class attachment {
  data: rawAttachment;

  constructor(data: rawAttachment) {
    this.data = data;
  }

  getRawURL(client: client) {
  }
}
