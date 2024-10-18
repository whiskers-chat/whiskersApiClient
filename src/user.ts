import type { client } from "./client.ts";
import type { getPostData } from "./posts.ts";

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

export interface updateUserProfileData {
  quote?: string; // User quote
  profileColor?: string; // Hex code for the pfp color
  pronouns?: string; // User Pronouns, not used by all clients
  lastFM?: string; // LastFM account, not used by all clients
}

export interface updateFavoriteChatsData {
  favoriteList: string[]; // List of the id's of chats the user has in their favorites
}

export interface updateProfileImageData {
  rawProfileImage: any; // Raw image data for the profile
}

export interface userConstructorData {
  UUID?: string; // The UUID of the user; if rawUserData or username is not included than this must be included.
  username?: string; // The username of the user
  rawUserData?: rawUserData;
}

export class user {
  rawData: rawUserData;

  constructor(client: client, data: userConstructorData) {
    // TODO: Get the user data from the server
    // TODO: REMOVE NON NULL THING
    this.rawData = data.rawUserData!;
  }

  async updateProfile(client: client, data: updateUserProfileData) {
  }

  async updateProfileImage(client: client, data: updateProfileImageData) {
  }

  async updateFavoriteChats(client: client, data: updateFavoriteChatsData) {
  }

  async getPosts(client: client, data: getPostData) {
  }
}
