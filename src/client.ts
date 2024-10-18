import { type rawUserData, user } from "./user.ts";

export type loginResponseData = {
  "account": rawUserData;
  "error": boolean;
  "token": string;
  "type"?: string;
};

export type miniResponse = {
  error: boolean;
  errorData?: string[];
  result?: any;
};

export interface signupData {
  username: string; // user Username
  password: string; // User password
  hCaptcha_Code?: string; // Meower uses HCaptcha to protect sign up, this is the password that is returned by HCaptcha that is required to login
}

export interface loginData {
  username: string; // user Username
  password: string; // User password
  authCode?: string; // 6 digit 2fa auth code
  connectWebsocket?: boolean; // Should the client also connect to the webSocket when logging in, default is true.
}

export interface updatePwData {
  oldPassword: string; // The users old password
  newPassword: string; // The users new password, make sure the user has confirmed it twice
  authCode?: string; // The otp code if a user has a authenticator enabled
}

export class client {
  #username?: string;
  #password?: string;
  #REST_URL: string;
  #WSS_URL: string;
  token?: string;

  constructor(
    ServerREST_URL?: string,
    ServerWSS_URL?: string,
  ) {
    this.#REST_URL = ServerREST_URL !== undefined
      ? ServerREST_URL
      : "https://api.meower.org";
    this.#WSS_URL = ServerWSS_URL !== undefined
      ? ServerWSS_URL
      : "wss://server.meower.org/?v=1";
  }

  async login(data: loginData): Promise<miniResponse> {
    const requestEndpoint = this.#REST_URL + "/auth/login";
    const requestData = {
      method: "post",
      body: JSON.stringify({
        "username": data.username,
        "password": data.password,
        "totp_code": data.authCode ?? undefined,
      }),
    };

    const rawResponse: Response = await fetch(requestEndpoint, requestData);

    const responseData: loginResponseData = await rawResponse.json();

    switch (await rawResponse.status) {
      case 400: {
        // TODO: Check the request before sending it to make sure its valid
        const errorResult: miniResponse = {
          error: true,
          errorData: ["invalidData"],
        };
        return errorResult;
        break;
      }
      case 401: {
        let errorResult: miniResponse = {
          error: true,
          errorData: ["invalidCredentials"],
        };
        if (responseData.type === "invalidCredentials") { errorResult = {
            error: true,
            errorData: ["mfaRequired"],
          };}
        return errorResult;
        break;
      }
      case 429: {
        const errorResult: miniResponse = {
          error: true,
          errorData: ["rateLimited"],
        };
        return errorResult;
        break;
      }
      case 500: {
        const errorResult: miniResponse = {
          error: true,
          errorData: ["serverError"],
        };
        return errorResult;
        break;
      }
    }

    if (responseData.error == true) {
      switch (responseData.type) {
        case "accountDeleted": {
          const errorResult: miniResponse = {
            error: true,
            errorData: ["accountDeleted"],
          };
          return errorResult;
          break;
        }
        default: {
          const errorResult: miniResponse = {
            error: true,
            errorData: ["unknownError", responseData.type!],
          };
          return errorResult;
          break;
        }
      }
    }

    const userData: user = new user(this, {
      rawUserData: responseData.account,
    });

    this.token = responseData.token;
    this.#password = data.password;
    this.#username = data.username;

    if (data.connectWebsocket === true) {
      // Connect to websocket
    }

    return {
      result: userData,
      error: false,
    };
  }

  async signup(data: signupData) {
  }

  async updatePassword(data: updatePwData) {
    const requestEndpoint = this.#REST_URL + "/me/password";
    const requestData = {
      method: "post",
      body: JSON.stringify({
        "new": data.newPassword,
        "old": data.oldPassword,
      }),
    };

    const rawResponse: Response = await fetch(requestEndpoint, requestData);

    const responseData: loginResponseData = await rawResponse.json();

    switch (await rawResponse.status) {
      case 400: {
        // TODO: Check the request before sending it to make sure its valid
        const errorResult: miniResponse = {
          error: true,
          errorData: ["invalidData"],
        };
        return errorResult;
        break;
      }
      case 401: {
        let errorResult: miniResponse = {
          error: true,
          errorData: ["invalidCredentials"],
        };
        return errorResult;
        break;
      }
      case 429: {
        const errorResult: miniResponse = {
          error: true,
          errorData: ["rateLimited"],
        };
        return errorResult;
        break;
      }
      case 500: {
        const errorResult: miniResponse = {
          error: true,
          errorData: ["serverError"],
        };
        return errorResult;
        break;
      }
    }

    if (responseData.error == true) {
      switch (responseData.type) {
        case "accountDeleted": {
          const errorResult: miniResponse = {
            error: true,
            errorData: ["accountDeleted"],
          };
          return errorResult;
          break;
        }
        default: {
          const errorResult: miniResponse = {
            error: true,
            errorData: ["unknownError", responseData.type!],
          };
          return errorResult;
          break;
        }
      }
    }

    this.#password = data.newPassword;

    return {
      result: "success",
      error: false,
    };
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
