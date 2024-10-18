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

export type rawPostData = {
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
  "reply_to": postData[] | null[];
  "stickers": [];
  "nonce"?: string;
  "type": number;
  "post_id": string;
  "edited_at"?: number;
};

export interface postData {
  content?: string; // Content of the post, char limit is 4000
  emojis?: emoji[]; // Emojis in the post
  attachments?: attachment[]; // Attachments in the post, make sure to create them before sending the post
}

export interface reportData {
  reason: string; // Reason for report
  comment: string; // Comment from user on why they made the report
}

export interface reactionData {
  emote: string & { length: 1 }; // The emoji to set the a reaction for
}

export interface shareLinkBranding {
  bgColor: string; // Background color
  bgColorDark?: string; // Background color in dark mode
  logo: string; // URL of logo to show on the page
  logoLink: string; // Link to navigate to on click of the logo
  logoDark?: attachment; // URL of logo to show in dark mode
  openDomain?: string; // The domain to open the post in
  customCSS?: string; // URL of a custom style sheet to use
  showWhiskersCredit?: boolean; // Should the page show a small credit to the whiskers share service in the corner
}

export interface shareLinkData {
  shortURL?: boolean; // Toggles if share link use the links.whiskers.chat url shortener
  showReplyHistory?: boolean; // Toggles the visibility of the reply chain on a post
  showPFPImages?: boolean; // Toggles the visibility of PFP images
  branding?: shareLinkBranding; // Set custom branding for the share link
}

export interface getPostData {
  page: number; // The page of posts to get
}

export class post {
  data: rawPostData;
  // TODO: allow lookup based on id
  constructor(data: rawPostData) {
    this.data = data;
  }

  async reply(client: client, data: postData) {
  }

  async addReaction(client: client, data: reactionData) {
  }

  async removeReaction(client: client, data: reactionData) {
  }

  async report(client: client, data: reportData) {
  }

  async createShareLink(client: client, data: shareLinkData) {
  }

  async deletePost(client: client) {
  }

  async update(client: client, data: postData) {
  }
}
