import { client } from "@/server/api";
import { queryOptions } from "@tanstack/react-query";

export const specialitiesOptions = queryOptions({
  queryKey: ["specialities"],
  queryFn: async () => {
    const response = await client.api.specialities.$get();

    if (!response.ok) {
      throw new Error("Une erreur est survenue");
    }

    return response.json();
  },
});
