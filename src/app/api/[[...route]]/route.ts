import { env } from "@/env";
import { auth } from "@/server/auth";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import { specialityRouter } from "./routes/speciality.route";

export const runtime = "nodejs";

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>().basePath("/api");

app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

app.use(
  "/api/auth/*", // or replace with "*" to enable cors for all routes
  cors({
    origin: env.BASE_APP_URL, // replace with your origin
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .get("/hello", (c) => {
    return c.json({
      message: "Hello Next.js!",
    });
  })
  .route("/specialities", specialityRouter);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
