import type { client, miniResult } from "./mod.ts";

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
  "attachments": attachment[];
  "author": {
    "_id": string;
    "avatar": string;
    "avatar_color": string;
    "flags": number;
    "pfp_data": number;
    "uuid": string;
  };
  "emojis": emoji[];
  "error"?: boolean;
  "u": string;
  "t": {
    "e": number;
  };
  "p": string;
  "isDeleted": boolean;
  "pinned": boolean;
  "post_origin": string;
  "reactions": reaction[];
  "reply_to": postData[];
  "stickers": [];
  "nonce"?: string;
  "type": number;
  "post_id": string;
  "edited_at"?: number;
};

export class post {
  #apiClient: client;
  data: postData;

  constructor(data: postData, apiClient: client) {
    this.data = data;
    this.#apiClient = apiClient;
  }

  async reply(
    content: string,
    attachments?: string[],
  ) {
    let result;

    if (attachments !== undefined) {
      result = await this.#apiClient.sendMessage(content, "home", [
        this.data["_id"],
      ], attachments);
    } else {
      result = await this.#apiClient.sendMessage(content, "home", [
        this.data["_id"],
      ]);
    }

    return result;
  }

  async addReaction(char: string): Promise<miniResult> {
    const result = await this.#apiClient.addReaction(this.data._id, encodeURIComponent(char));
    return result;
  } 
}
