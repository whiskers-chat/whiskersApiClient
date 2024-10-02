import { assertEquals } from "@std/assert/equals";
import { client, type miniResult } from "../src/mod.ts";

Deno.test("sendPostHome", async () => {
    let user = new client(
      Deno.env.get("MEOWERTESTUSER")!,
      Deno.env.get("MEOWERTESTPW")!,
    );
    await user.login();
    const result: miniResult = await user.sendMessage(
      "This is a test post made by a deno testing workflow, please ignore it. If you have any issues, or want this disabled, contact @Blahaj on meower.",
      "home",
    );
    assertEquals(result.success, true);
  });
  