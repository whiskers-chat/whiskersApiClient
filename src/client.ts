export interface signup_data {
  hCaptcha_Code?: string;
}

export interface login_data {
  authCode?: string;
  loginMethod?: "modern" | "classic";
  connectWebsocket?: boolean;
}

export interface updatePW_data {
  oldPassword: string;
  newPassword: string;
  authCode?: string;
}

export class client {
  #username: string;
  #password: string;
  #REST_URL: string;
  #WSS_URL: string;

  constructor(
    accountUsername: string,
    accountPassword: string,
    ServerREST_URL?: string,
    ServerWSS_URL?: string,
  ) {
    this.#username = accountUsername;
    this.#password = accountPassword;
    this.#REST_URL = ServerREST_URL !== undefined
      ? ServerREST_URL
      : "https://api.meower.org";
    this.#WSS_URL = ServerWSS_URL !== undefined
      ? ServerWSS_URL
      : "wss://server.meower.org/?v=1";
  }

  async login(data: login_data) {
  }

  async signup(data: signup_data) {
  }

  async updatePassword(data: updatePW_data) {
  }

  async addAuthenticator() {
  }

  async getAuthenticator() {
  }

  async removeAuthenticator() {
  }

  async clearTokens() {
  }
}
