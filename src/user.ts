import type { client } from "./client.ts";

export type rawUserData = {
  "_id": string;
  "active_dms": string[]; // List of the id's of dm's a user is in
  "avatar": string; // ID of the avatar on the uploads server
  "avatar_color": string; // Hex code for the color of the avatar
  "ban"?: {
    "expires": number;
    "reason": string;
    "restrictions": number;
    "state": string;
  };
  "banned": boolean;
  "bgm": boolean; // Old value for svelte
  "bgm_song": number; // Old value for svelte
  "created": number; // Creation timestamp of the account
  "debug": boolean;
  "error": boolean;
  "favorited_chats": string[]; // List of the id's of chats the user has favorited
  "flags": number;
  "hide_blocked_users": boolean; // Old value for svelte
  "last_seen": number; // Timestamp on the last time the user was seen on Meower
  "layout": string; // Old value for svelte
  "lower_username": string; // username
  "lvl": number; // Admin value, can be ignored
  "mode": boolean;
  "permissions": number; // 0 is normal user, 1 is admin
  "pfp_data": number; // Old value for svelte
  "quote": string; // The bio of the user
  "sfx": boolean; // Old value for svelte
  "theme": string; // Old value for svelte
  "unread_inbox": boolean; // Old value for svelte
  "uuid": string; // UUID of the user
};

export interface updateUserProfile_Data {
  quote?: string; // User quote
  profileColor?: string; // Hex code for the pfp color
  pronouns?: string; // User Pronouns, not used by all clients
  lastFM?: string; // LastFM account, not used by all clients
}

export interface updateFavoriteChats_Data {
  favoriteList: string[]; // List of the id's of chats the user has in their favorites
}

export interface updateProfileImage_Data {
  rawProfileImage: any; // Raw image data for the profile
}

export class user {
  rawData: rawUserData;

  constructor(data: rawUserData) {
    this.rawData = data;
  }

  async updateProfile(client: client, data: updateUserProfile_Data) {
  }

  async updateProfileImage(client: client, data: updateProfileImage_Data) {
  }

  async updateFavoriteChats(client: client, data: updateFavoriteChats_Data) {
  }
}
