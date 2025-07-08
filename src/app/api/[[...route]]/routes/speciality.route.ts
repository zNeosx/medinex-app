import { db } from "@/server/db";
import {
  practitioner,
  practitionerSpecialties,
  specialty,
  user,
  userRoleEnum,
} from "@/server/db/schema";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { practitionerRegisterSchema } from "@/lib/validation";
import { auth } from "@/server/auth";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";

export const specialityRouter = new Hono()
  .get("/", async (c) => {
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
  })
  .post("/", zValidator("json", practitionerRegisterSchema), async (c) => {
    const input = c.req.valid("json");

    try {
      const transaction = await db.transaction(async (tx) => {
        const response = await auth.api.signUpEmail({
          body: {
            email: input.email,
            password: input.password,
            name: `${input.firstName} ${input.lastName}`,
          },
        });

        if (!response.user?.id) {
          throw new Error("Échec de la création du compte utilisateur");
        }

        await tx
          .update(user)
          .set({
            role: userRoleEnum.enumValues[1],
          })
          .where(eq(user.id, response.user.id));

        const practitionerId = nanoid();
        const [practitionerCreated] = await tx
          .insert(practitioner)
          .values({
            id: practitionerId,
            userId: response.user.id,
            firstName: input.firstName,
            lastName: input.lastName,
            phone: input.phone,
            medicalLicenseNumber: input.medicalLicenseNumber,
            image: null,
          })
          .returning();

        await tx.insert(practitionerSpecialties).values({
          practitionerId,
          specialtyId: input.medicalSpeciality,
        });

        if (!practitionerCreated) {
          throw new Error("Échec de la création du compte praticien");
        }

        return { practitioner: practitionerCreated };
      });

      return c.json({
        data: transaction,
        error: null,
      });
    } catch (err) {
      console.error("Erreur lors de l'inscription :", err);
      return c.json(
        {
          data: null,
          error: {
            message:
              err instanceof Error
                ? err.message
                : "Une erreur inattendue est survenue",
          },
        },
        500,
      );
    }
  });
