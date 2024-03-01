import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

export async function MajorSeeder(client: PrismaClient) {
  const majorNames = [
    "TKP (Teknik Konstruksi dan Perumahan)",
    "TPFL (Teknik Pengelasan dan Fabrikasi Logam)",
    "PPLG (Pengembangan Perangkat Lunak dan Gim)",
    "KPBS (Konstruksi dan Perawatan Bangunan Sipil)",
    "TE (Teknik Elektronika)",
    "TO (Teknik Otomotif)",
    "TK (Teknik Ketenagalistrikan)",
  ];

  const data = [];
  majorNames.forEach((name) => {
    data.push({
      name,
      createdAt: faker.date.recent({
        days: faker.number.int({ min: 1, max: 30 }),
      }),
    });
  });

  return await client.major.createMany({
    data,
  });
}
