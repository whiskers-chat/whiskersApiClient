import type { client } from "./client.ts";
import type { getPost_Data } from "./posts.ts";
import type { user } from "./user.ts";

export interface chatData {
  _id: string; // ID of the chat
  allow_pinning: boolean; // Are posts allowed to be pinned in the chat
  created: number; // Timestamp of the creation of the GC
  deleted: boolean;
  emojis: emoji[]; // List of emojis in the GC
  error: boolean;
  icon: string;
  icon_color: string; // Hex Code for the icon color of the chat
  last_active: number; // Timestamp of last post in the chat
  members: string[]; // List of members in the chat
  nickname: string; // Chat nickname
  owner: string; // Username of the owner of the chat
  stickers: [];
  type: number;
}

export interface updateChat_Data {
  icon?: string;
  icon_color?: string;
  nickname?: string;
}

export interface updateUsers_Data {
  user: string;
}

export type emoji = {
  "_id": string;
  "animated": boolean;
  "name": string;
};

export interface chatConstructor_Data {
  chatID?: string; // The ID of the chat; if chatData is not included than this must be included.
  chatData?: string;
}

export type rawChatData = {
  "_id": string; // ID of the chat
  "allow_pinning": boolean; // Are posts allowed to be pinned in the chat
  "created": number; // Timestamp of the creation of the GC
  "deleted": boolean;
  "emojis": emoji[]; // List of emojis in the GC
  "error": boolean;
  "icon": string;
  "icon_color": string; // Hex Code for the icon color of the chat
  "last_active": number; // Timestamp of last post in the chat
  "members": string[]; // List of members in the chat
  "nickname": string; // Chat nickname
  "owner": string; // Username of the owner of the chat
  "stickers": [];
  "type": number;
};

export class chat {
  data: chatData;

  constructor(client: client, data: chatConstructor_Data) {
    // TODO: Get the chatData from the server to create the class
  }

  getRawChatData() {
  }

  async createPost() {
  }

  async getPosts(client: client, data: getPost_Data) {
  }

  async updateChat(client: client, data: updateChat_Data) {
  }

  async addUser(client: client, data: updateUsers_Data) {
  }

  async removeUser(client: client, data: updateUsers_Data) {
  }

  async deleteChat(client: client) {
  }

  async leaveChat(client: client) {
  }

  async favoriteChat() {
  }

  async unFavoriteChat() {
  }
}
