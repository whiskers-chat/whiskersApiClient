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
})

Deno.test("meowerAuth", async () => {
  let user = new client(Deno.env.get("MEOWERTESTUSER")!,Deno.env.get("MEOWERTESTPW")!);
  const result: miniResult = await user.login();
  assertEquals(result.success, true);
})