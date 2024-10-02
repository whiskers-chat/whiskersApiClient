export type miniResult = {
  error: string | null,
  success: boolean,
}

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
  
  // TODO: Add logging
  // TODO: Return an error if the password is invalid
  async login(): Promise<miniResult> {
    const endPoint = "/auth/login"

    const request = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "username": this.#username,
        "password": this.#password,
      })
    }

    try {
      const response = await fetch(this.#meowerRESTurl + endPoint, request);
      const responseJSON= await response.json();
      this.#token = responseJSON["token"];
      return {
        error: null,
        success: true,
      }
    } catch(err: any) {
      return {
        error: err.toString(),
        success: false,
      }
    }
  }

  async sendTypingHome(): Promise<miniResult> {
    const endPoint = `/home/typing`

    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': this.#token
      },
    }

    try {
      const response = await fetch(this.#meowerRESTurl + endPoint, request);
      const responseJSON = await response.json();

      if (responseJSON["error"] == true) {
        throw new Error(responseJSON["type"]);
      }
      return {
        error: null,
        success: true,
      }
    } catch(err: any) {
      console.log("Endpoint: " + endPoint)
      console.error(err);
      return {
        error: err.toString(),
        success: false,
      }
    }
  }
}