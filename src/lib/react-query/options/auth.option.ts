import { authClient } from "@/lib/auth-client";
import { queryOptions } from "@tanstack/react-query";

export const sessionOptions = queryOptions({
  queryKey: ["session"],
  queryFn: async () => {
    const data = await authClient.getSession();

    if (!data) {
      throw new Error("Une erreur est survenue");
    }

    console.log("data session", data);
    return data.data;
  },
});
