import { fullPatientSchema } from "@/lib/validation";
import { db } from "@/server/db";
import { allergy, medicalCondition, patient } from "@/server/db/schema";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { nanoid } from "nanoid";

export const patientRouter = new Hono()
  .get("/", async (c) => {
    try {
      const patients = await db.query.patient.findMany({
        orderBy: (patients, { desc }) => [desc(patients.createdAt)],
      });

      return c.json({
        data: patients,
        error: null,
      });
    } catch (error) {
      console.error("Patient request failed:", error);
      return c.json(
        {
          data: null,
          error: {
            message: "Erreur lors de la récupération des patients",
          },
        },
        500,
      );
    }
  })
  .post("/", zValidator("json", fullPatientSchema), async (c) => {
    const body = c.req.valid("json");

    try {
      const result = await db.transaction(async (tx) => {
        const patientId = nanoid();

        await tx.insert(patient).values({
          id: patientId,
          ...body.patient,
        });

        if (body.allergies?.length) {
          await tx.insert(allergy).values(
            body.allergies.map((a) => ({
              id: nanoid(),
              patientId,
              ...a,
            })),
          );
        }

        if (body.medicalConditions?.length) {
          await tx.insert(medicalCondition).values(
            body.medicalConditions.map((mc) => ({
              id: nanoid(),
              patientId,
              ...mc,
            })),
          );
        }

        return patientId;
      });

      return c.json({ data: result, error: null });
    } catch (error) {
      console.error("Patient creation failed:", error);
      return c.json(
        {
          data: null,
          error: {
            message: "Erreur lors de la création du patient",
          },
        },
        500,
      );
    }
  });
