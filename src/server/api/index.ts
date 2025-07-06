import type { AppType } from "@/app/api/[[...route]]/route";
import { env } from "@/env";
import { hc } from "hono/client";

export const client = hc<AppType>(env.NEXT_PUBLIC_BASE_APP_URL, {
  fetch: ((input, init) => {
    return fetch(input, {
      ...init,
      credentials: "include", // Required for sending cookies cross-origin
    });
  }) satisfies typeof fetch,
});

// Now your client requests will include credentials
// const response = await client.someProtectedEndpoint.$get();
