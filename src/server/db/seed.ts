import "dotenv/config";
import { nanoid } from "nanoid";

import { drizzle } from "drizzle-orm/postgres-js";
import { specialty } from "./schema";
import postgres from "postgres";

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL n'est pas définie !");
  }

  const client = postgres(process.env.DATABASE_URL, { ssl: false });
  const db = drizzle(client);

  const specialties = [
    { name: "Médecine Générale", description: "Suivi global du patient." },
    {
      name: "Cardiologie",
      description: "Spécialiste du cœur et des vaisseaux.",
    },
    { name: "Dermatologie", description: "Peau, cheveux et ongles." },
    { name: "Pédiatrie", description: "Médecine de l'enfant." },
    { name: "Gynécologie", description: "Santé de la femme." },
    {
      name: "Psychiatrie",
      description: "Santé mentale et troubles psychiques.",
    },
    { name: "Radiologie", description: "Imagerie médicale." },
    { name: "Oncologie", description: "Traitement du cancer." },
    { name: "Ophtalmologie", description: "Santé des yeux." },
    { name: "Neurologie", description: "Système nerveux et cerveau." },
  ];

  await db.insert(specialty).values(
    specialties.map((spec) => ({
      id: nanoid(),
      ...spec,
    })),
  );

  console.log("🌱 Spécialités créées avec succès");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(() => process.exit(1));
