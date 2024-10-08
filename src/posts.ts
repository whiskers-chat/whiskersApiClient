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
  content?: string; // Content of the post, char limit is 4000
  emojis?: emoji[]; // Emojis in the post
  attachments?: attachment[]; // Attachments in the post, make sure to create them before sending the post
}

export interface report_data {
  reason: string; // Reason for report
  comment: string; // Comment from user on why they made the report
}

export interface reaction_data {
  emote: string & { length: 1 }; // The emoji to set the a reaction for
}

export interface shareLink_Branding {
  bgColor: string; // Background color
  bgColorDark?: string; // Background color in dark mode
  logo: attachment; // Logo to show on the page
  logoLink: string; // Link to navigate to on click of the logo
  logoDark?: attachment; // Logo to show in dark mode
  openDomain?: string; // The domain to open the post in
  customCSS?: string; // URL of a custom style sheet to use
  showWhiskersCredit?: boolean; // Should the page show a small credit to the whiskers share service in the corner.
}

export interface shareLink_data {
  shortURL?: boolean; // Toggles if share link use the links.whiskers.chat url shortener
  showReplyHistory?: boolean; // Toggles the visibility of the reply chain on a post
  showPFPImages?: boolean; // Toggles the visibility of PFP images
  branding?: shareLink_Branding; // Set custom branding for the share link
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

  async createShareLink(client: client, data: shareLink_data) {
  }

  async deletePost(client: client) {
  }

  async update(client: client, data: post_data) {
  }
}
