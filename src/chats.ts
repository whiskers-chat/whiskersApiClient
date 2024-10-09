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

export type emoji = {
    "_id": string;
    "animated": boolean;
    "name": string;
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

  constructor(chatData: chatData) {
    this.data = chatData;
  }

  getRawChatData() {
  }

  async createPost() {

  }

  async updateChat() {
    
  }
}
