import { PrismaClient } from "@prisma/client";
import { MenfessSeeder } from "./seeders/menfess-seeder";
import UserSeeder from "./seeders/user-seeder";

async function main() {
  const client = new PrismaClient();

  await UserSeeder(client);
  await MenfessSeeder(client, 10);

  await client.$disconnect();
}

main();
