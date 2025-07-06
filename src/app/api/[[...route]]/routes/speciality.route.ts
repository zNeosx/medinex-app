import { db } from "@/server/db";
import { specialty } from "@/server/db/schema";
import { Hono } from "hono";

export const specialityRouter = new Hono().get("/", async (c) => {
  try {
    const allSpecialities = await db.select().from(specialty);

    return c.json({
      data: allSpecialities ?? [],
      error: null,
    });
  } catch (error) {
    console.log("error", error);
    return c.json({
      data: null,
      error,
    });
  }
});
