import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";

export async function MenfessSeeder(client: PrismaClient, count: number = 5) {
  const users = await client.user.findMany({
    select: { id: true },
  });

  const data: Prisma.MenfessCreateManyInput[] = [];
  for (let i = 0; i < count; i++) {
    data.push({
      content: faker.word.words({
        count: {
          min: 5,
          max: 20,
        },
      }),
      anonymous: faker.datatype.boolean(),
      authorId: faker.helpers.arrayElement(users).id,
      createdAt: faker.date.recent({
        days: faker.number.int({ min: 1, max: 30 }),
      }),
    });
  }

  return await client.menfess.createMany({
    data,
  });
}
