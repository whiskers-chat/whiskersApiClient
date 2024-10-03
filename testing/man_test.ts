import { post } from "../src/posts.ts";
import { assertEquals, assertNotEquals } from "@std/assert";
import "jsr:@std/dotenv/load";
import { client, type miniResult } from "../src/mod.ts";

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

Deno.test("replyPostHome", async () => {
  let user = new client(
    Deno.env.get("MEOWERTESTUSER")!,
    Deno.env.get("MEOWERTESTPW")!,
  );
  await user.login();

  const firstPostResult: miniResult = await user.sendMessage(
    "This is a test post made by a deno testing workflow, please ignore it. If you have any issues, or want this disabled, contact @Blahaj on meower.",
    "home",
  );

  const postResult: post = new post(firstPostResult.result, user);

  const result: miniResult = await postResult.reply(
    "This is a test post repl made by a deno testing workflow, please ignore it. If you have any issues, or want this disabled, contact @Blahaj on meower.",
  );
  
  assertEquals(result.success, true);
});

Deno.test("reactPostHome", async () => {
  let user = new client(
    Deno.env.get("MEOWERTESTUSER")!,
    Deno.env.get("MEOWERTESTPW")!,
  );

  await user.login();

  const firstPostResult: miniResult = await user.sendMessage(
    "This is a test post made by a deno testing workflow for testing reactions, please ignore it. If you have any issues, or want this disabled, contact @Blahaj on meower.",
    "home",
  );

  const postResult: post = new post(firstPostResult.result, user);

  const result: miniResult = await postResult.addReaction("🏳️‍⚧️")
  
  assertEquals(result.success, true);
});