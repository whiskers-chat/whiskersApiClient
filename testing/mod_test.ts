import { assertEquals, assertNotEquals } from "@std/assert";
import "jsr:@std/dotenv/load";
import { client, type loginData } from "../src/client.ts";

Deno.test("testingEnvFileSetup", () => {
  if (Deno.env.get("MEOWERTESTUSER") === undefined) {
    console.warn("The env file is missing a username for testing");
  }
  if (Deno.env.get("MEOWERTESTPW") === undefined) {
    console.warn("The env file is missing a password for testing");
  }

  assertNotEquals(Deno.env.get("MEOWERTESTUSER"), undefined);
  assertNotEquals(Deno.env.get("MEOWERTESTPW"), undefined);
});

// Login Module Testing

Deno.test("clientLogin", async (test) => {
  const meower = new client();

  const testingUsername = Deno.env.get("MEOWERTESTUSER");
  const testingPassword = Deno.env.get("MEOWERTESTPW");

  await test.step("login", async () => {
    const loginInfo: loginData = {
      username: testingUsername!,
      password: testingPassword!,
    };

    const result = await meower.login(loginInfo);

    if (result.error === true) console.log(result);

    assertEquals(result.error, false);
    assertNotEquals(meower.token, undefined);
  });

  await test.step("clearTokens", async () => {
    const result = await meower.clearTokens();

    if (result.error === true) console.log(result);

    assertEquals(result.error, false);
  });
});
