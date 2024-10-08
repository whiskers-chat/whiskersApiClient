import { attachment, rawAttachment } from "./attachments.ts";
import { client } from "./client.ts";

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

export type postData = {
  "_id": string;
  "attachments": rawAttachment[];
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

export interface post_data {
  content?: string,
  emojis?: emoji[]
  attachments?: attachment[]
}

export interface report_data {
  reason: string,
  comment: string,
}

export interface reaction_data {
  emote: string,
}

export interface shareLink_Branding {
  bgColor: string,
  bgColorDark?: string,
  logo: attachment,
  logoLink: string,
  logoDark?: attachment,
  openDomain?: string,
  customCSS?: string,
  showWhiskersCredit?: boolean,
}

export interface shareLink_config {
  shortURL?: boolean,
  showReplyHistory?: boolean,
  showPFPImages?: boolean,
  branding?: shareLink_Branding,
}

export class post {
  data: postData;

  constructor(data: postData) {
    this.data = data;
  }

  async reply(client: client, data: post_data) {

  }

  async addReaction(client: client, data: reaction_data) {

  }

  async removeReaction(client: client, data: reaction_data) {

  }

  async report(client: client, data: report_data) {

  }

  async createShareLink(client: client) {

  }

  async deletePost(client: client) {

  }

  async update(client: client, data: post_data) {

  }
}
