export type miniResult = {
  error: string | null;
  success: boolean;
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
}
