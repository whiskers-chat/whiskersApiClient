import { assertEquals, assertNotEquals } from "@std/assert";
import "jsr:@std/dotenv/load";
import { client, type miniResult } from "./mod.ts";

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

Deno.test("meowerAuth", async () => {
  let user = new client(
    Deno.env.get("MEOWERTESTUSER")!,
    Deno.env.get("MEOWERTESTPW")!,
  );
  const result: miniResult = await user.login();
  assertEquals(result.success, true);
});

Deno.test("meowerTypingHome", async () => {
  let user = new client(
    Deno.env.get("MEOWERTESTUSER")!,
    Deno.env.get("MEOWERTESTPW")!,
  );
  await user.login();
  const result: miniResult = await user.sendTyping("home");
  assertEquals(result.success, true);
});

Deno.test("meowerTypingLiveChat", async () => {
  let user = new client(
    Deno.env.get("MEOWERTESTUSER")!,
    Deno.env.get("MEOWERTESTPW")!,
  );
  await user.login();
  const result: miniResult = await user.sendTyping("livechat");
  assertEquals(result.success, true);
});

Deno.test("meowerSetQuote", async () => {
  let user = new client(
    Deno.env.get("MEOWERTESTUSER")!,
    Deno.env.get("MEOWERTESTPW")!,
  );
  await user.login();
  const result: miniResult = await user.setQuote(
    "Deno Test Ran on: " + new Date().toString(),
  );
  assertEquals(result.success, true);
});

Deno.test("meowerPfpColor", async () => {
  let user = new client(
    Deno.env.get("MEOWERTESTUSER")!,
    Deno.env.get("MEOWERTESTPW")!,
  );
  await user.login();
  const result: miniResult = await user.setPfpColor("ff00a0");
  assertEquals(result.success, true);
});

// Test is disabled until uploads support is added.
/*
Deno.test("meowerPfpIcon", async () => {
  let user = new client(Deno.env.get("MEOWERTESTUSER")!,Deno.env.get("MEOWERTESTPW")!);
  await user.login();
  const result: miniResult = await user.setAvatar("CnPzASDPJBGDfI8hCbqxVGC8");
  assertEquals(result.success, true);
})
*/
