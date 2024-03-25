import { PrismaClient } from '@prisma/client';
import { MenfessSeeder } from './seeders/menfess-seeder';
import UserSeeder from './seeders/user-seeder';
import { MajorSeeder } from './seeders/major-seeder';
import ProductionSeeder from './seeders/production-seeder';

async function main() {
  const table = process.argv[2];

  const client = new PrismaClient();

  switch (table) {
    case 'all':
      await UserSeeder(client);
      await MenfessSeeder(client, 20);
      await MajorSeeder(client);
      break;
    case 'user':
      await UserSeeder(client);
      break;
    case 'menfess':
      const count = process.argv[3] ? parseInt(process.argv[3]) : 20;
      await MenfessSeeder(client, count);
      break;
    case 'major':
      await MajorSeeder(client);
      break;
    case 'production':
      await ProductionSeeder(client);
      break;
    default:
      console.log('Invalid table name!');
      break;
  }

  await client.$disconnect();
}

main();
