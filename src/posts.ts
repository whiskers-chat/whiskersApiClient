import type { client } from "./mod.ts";

export type emoji = {
  "_id": string;
  "chat_id": string;
  "name": string;
  "animated": boolean;
};

export type reaction = {
  "emoji": string;
  "count": number;
  "user_reacted"?: boolean;
  "username"?: string;
};

export type attachment = {
  "id": string;
  "mime": string;
  "filename": string;
  "size": number;
  "width": number;
  "height": number;
};

export type postData = {
  "_id": string;
  "post_origin": string;
  "u": string;
  "t": {
    "e": number;
  };
  "p": string;
  "attachments": attachment[];
  "isDeleted": false;
  "pinned": false;
  "reactions": reaction[];
  "emojis": emoji[];
  "nonce"?: string;
  "type": 1;
  "post_id": string;
  "edited_at"?: number;
  "author": {
    "_id": string;
    "uuid": string;
    "pfp_data": number;
    "avatar": string;
    "avatar_color": string;
    "flags": number;
  };
  "reply_to": postData[];
};

export class post {
  #apiClient: client;
  data: postData;

  constructor(data: postData, apiClient: client) {
    this.data = data;
    this.#apiClient = apiClient;
  }
}
