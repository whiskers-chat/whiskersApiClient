import { escape, unescape } from "@std/html";
import { type authenticator } from "./client.ts";

/* WARNING: Setting protectFromXSS to false is very dangerous, it could result in MAJOR issues and could allow user accounts to be hacked
Setting this to false will remove all XSS protection built into the api. You should always write your code assuming that the input is not sanitized, but this indented to try and protect you if you forget to do it somewhere.
In general, we try to sanitize any field that has a string to prevent xss, turning this off will disable that.
Instead of disabling this, we recommend just unescaping the text with either deno unescape from @std/html or use a temporary dom element like shown below as needed, this means that the api will provide protection in areas prone to oversight.
To make this quicker, we have provided a unProtectText function, just pass it the text you want to decode, and it will return the result.
var txt = document.createElement("textarea");
txt.innerHTML = strToUnscape;
var uncleanText = txt.textContent;
*/

// deno-lint-ignore prefer-const
export let protectFromXSS: boolean = true;

export function protectText(text: string): string {
  if (protectFromXSS) {
    return escape(text);
  } else {
    return text;
  }
}

// DANGER: read the note above before using
export function unProtectText(text: string): string {
  return unescape(text);
}

export const protectAuthenticators = (
  data: authenticator[],
): authenticator[] => {
  return data.map((value: authenticator) => {
    const newId: string = protectText(value._id);
    const newName: string = protectText(value.nickname);

    return {
      ...value,
      _id: newId,
      nickname: newName,
    };
  });
};
