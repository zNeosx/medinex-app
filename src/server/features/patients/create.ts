import { client } from "@/server/api";
import { useMutation } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<typeof client.api.patients.$post>;
type RequestType = InferRequestType<typeof client.api.patients.$post>["json"];

export const useCreatePatient = () =>
  useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json: RequestType) => {
      const response = await client.api.patients.$post({
        json,
      });

      const data = await response.json();

      console.log("response", response);

      if (!response.ok) {
        throw new Error(data?.error?.message ?? "Une erreur est survenue");
      }

      console.log("data", data);
      return data;
    },
  });
