import type { post, postData } from "./posts.ts";

export type miniResult = {
  error: string | null;
  success: boolean;
  result?: postData | any;
};

export type newPostData = {
  "attachments"?: string[];
  "content": string;
  "nonce"?: string;
  "reply_to"?: string[];
  "stickers"?: string[];
};

export class client {
  #username: string;
  #password: string;
  #token: string = "";
  #meowerRESTurl = "https://api.meower.org";
  #meowerWebSocketUrl = "wss://server.meower.org?v=1";

  constructor(un: string, pw: string) {
    this.#username = un;
    this.#password = pw;
  }

  setServers(REST: string, ws: string) {
    this.#meowerRESTurl = REST;
    this.#meowerWebSocketUrl = ws;
  }

  async login(): Promise<miniResult> {
    const endPoint = "/auth/login";

    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "username": this.#username,
        "password": this.#password,
      }),
    };

    try {
      const response = await fetch(this.#meowerRESTurl + endPoint, request);
      const responseJSON = await response.json();

      if (responseJSON["error"] == true) {
        throw new Error(responseJSON["type"]);
      }

      this.#token = responseJSON["token"];

      return {
        error: null,
        success: true,
      };
    } catch (err: any) {
      console.log("Endpoint: " + endPoint);
      return {
        error: err.toString(),
        success: false,
      };
    }
  }

  async setQuote(quote: string): Promise<miniResult> {
    const endPoint = `/me/config`;

    const request = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "token": this.#token,
      },
      body: JSON.stringify({
        "quote": quote,
      }),
    };

    try {
      const response = await fetch(this.#meowerRESTurl + endPoint, request);
      const responseJSON = await response.json();

      if (responseJSON["error"] == true) {
        throw new Error(responseJSON["type"]);
      }
      return {
        error: null,
        success: true,
      };
    } catch (err: any) {
      console.log("Endpoint: " + endPoint);
      console.error(err);
      return {
        error: err.toString(),
        success: false,
      };
    }
  }

  async setPfpColor(color: string): Promise<miniResult> {
    const endPoint = `/me/config`;

    const request = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "token": this.#token,
      },
      body: JSON.stringify({
        "avatar_color": color,
      }),
    };

    try {
      const response = await fetch(this.#meowerRESTurl + endPoint, request);
      const responseJSON = await response.json();

      if (responseJSON["error"] == true) {
        throw new Error(responseJSON["type"]);
      }

      return {
        error: null,
        success: true,
      };
    } catch (err: any) {
      console.log("Endpoint: " + endPoint);
      console.error(err);
      return {
        error: err.toString(),
        success: false,
      };
    }
  }

  async sendTyping(chatID: string): Promise<miniResult> {
    let endPoint = `/chats/${chatID}/typing`;

    if (chatID == "home") {
      endPoint = `/home/typing`;
    }

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": this.#token,
      },
    };

    try {
      const response = await fetch(this.#meowerRESTurl + endPoint, request);
      const responseJSON = await response.json();

      if (responseJSON["error"] == true) {
        throw new Error(responseJSON["type"]);
      }

      return {
        error: null,
        success: true,
      };
    } catch (err: any) {
      console.log("Endpoint: " + endPoint);
      console.error(err);
      return {
        error: err.toString(),
        success: false,
      };
    }
  }

  async sendMessage(
    content: string,
    chatID: string,
    reply_to?: string[],
    attachments?: string[],
  ): Promise<miniResult> {
    let endPoint = `/posts/${chatID}`;

    if (chatID == "home") {
      endPoint = `/home/`;
    }

    let requestBody: newPostData = {
      "content": content,
    };

    if (reply_to !== undefined) {
      requestBody["reply_to"] = reply_to;
    }

    if (attachments !== undefined) {
      requestBody["attachments"] = attachments;
    }

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": this.#token,
      },
      body: JSON.stringify(requestBody),
    };

    try {
      const response = await fetch(this.#meowerRESTurl + endPoint, request);
      const responseJSON = await response.json();
      const resultJSON = await responseJSON;
      return {
        error: null,
        success: true,
        result: resultJSON,
      };
    } catch (err: any) {
      console.log("Endpoint: " + endPoint);
      console.error(err);
      return {
        error: err.toString(),
        success: false,
      };
    }
  }

  async setAvatar(iconID: string): Promise<miniResult> {
    const endPoint = `/me/config`;

    const request = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "token": this.#token,
      },
      body: JSON.stringify({
        "avatar": iconID,
      }),
    };

    try {
      const response = await fetch(this.#meowerRESTurl + endPoint, request);
      const responseJSON = await response.json();

      if (responseJSON["error"] == true) {
        throw new Error(responseJSON["type"]);
      }
      return {
        error: null,
        success: true,
      };
    } catch (err: any) {
      console.log("Endpoint: " + endPoint);
      console.error(err);
      return {
        error: err.toString(),
        success: false,
      };
    }
  }

  async addReaction(post_id: string, char: string): Promise<miniResult> {
    const endPoint = `/posts/${post_id}/reactions/${char}`;

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": this.#token,
      },
    };

    try {
      const response = await fetch(this.#meowerRESTurl + endPoint, request);
      const responseJSON = await response.json();

      if (responseJSON["error"] == true) {
        throw new Error(responseJSON["type"]);
      }
      return {
        error: null,
        success: true,
      };
    } catch (err: any) {
      console.log("Endpoint: " + endPoint);
      console.error(err);
      return {
        error: err.toString(),
        success: false,
      };
    }
  }


}
