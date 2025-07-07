import { client } from "@/server/api";
import { useMutation } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<typeof client.api.specialities.$post>;
type RequestType = InferRequestType<
  typeof client.api.specialities.$post
>["json"];
export const useRegisterPractitioner = () =>
  useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json: RequestType) => {
      const response = await client.api.specialities.$post({
        json,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Une erreur est survenue");
        // throw new Error(data.error?.message || 'Une erreur est survenue');
      }

      return data;
    },
  });
