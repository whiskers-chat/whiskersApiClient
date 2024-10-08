import { client } from "./client.ts";

export type rawAttachment = {
  "id": string;
  "mime": string;
  "filename": string;
  "size": number;
  "width": number;
  "height": number;
};

export interface attachmentUpload_data {
  rawUpload: any;
}

export async function uploadAttachment(
  client: client,
  data: attachmentUpload_data,
) {
}

export class attachment {
  data: rawAttachment;

  constructor(data: rawAttachment) {
    this.data = data;
  }

  getRawURL(client: client) {
  }
}
