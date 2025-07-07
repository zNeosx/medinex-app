import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema";
import { customSession } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "pg" or "mysql"
    schema: {
      ...schema,
      user: schema.user,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    customSession(async ({ user, session }) => {
      const userData = await db.query.practitioner.findFirst({
        where: (pract, { eq }) => eq(pract.userId, user.id),
        with: {
          practitionerSpecialties: {
            with: {
              specialty: true,
            },
          },
        },
      });

      return {
        user: {
          ...user,
          speciality: userData?.practitionerSpecialties[0]?.specialty ?? null,
        },
        session,
      };
    }),
  ],
});
