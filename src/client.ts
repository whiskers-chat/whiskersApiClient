import { user, type rawUserData, type user } from "./user.ts";

export type loginResponseData = {
  "account": rawUserData;
  "error": boolean;
  "token": string;
} 
export interface signup_data {
  hCaptcha_Code?: string; // Meower uses HCaptcha to protect sign up, this is the password that is returned by HCaptcha that is required to login
}

export interface login_data {
  authCode?: string; // 6 digit 2fa auth code
  connectWebsocket?: boolean; // Should the client also connect to the webSocket when logging in, if the classic login method is true, this must also be true
}

export interface updatePW_data {
  oldPassword: string; // The users old password
  newPassword: string; // The users new password, make sure the user has confirmed it twice
  authCode?: string; // The otp code if a user has a authenticator enabled
}

export class client {
  #username: string;
  #password: string;
  #REST_URL: string;
  #WSS_URL: string;
  token?: string;

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

  async login(data: login_data): Promise<user> {
    const requestEndpoint = this.#REST_URL + "/auth/login"
    const requestData = {
      method: "post",
      body: JSON.stringify({
        "username": this.#username,
        "password": this.#password,
      })
    }
    const rawResponse: Response = await fetch(requestEndpoint, requestData);

    const responseData: loginResponseData = await rawResponse.json();
    
    const userData: user = new user(this, { rawUserData: responseData.account });
    this.token = responseData.token;

    if (data.connectWebsocket !== false) {
      // Connect to websocket
    }

    return userData;
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
