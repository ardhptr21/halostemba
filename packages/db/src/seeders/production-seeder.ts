import { PrismaClient, Role } from '@prisma/client';

export default async function ProductionSeeder(client: PrismaClient) {
  return await client.user.create({
    data: {
      name: 'admin',
      username: 'admin',
      email: 'halostemba@gmail.com',
      password: '$2a$10$dmbv7vTzPR3Z4lGWgRueB.T7CJwDsxDqLoMliGH.1h5a6V2rZrUL6',
      role: Role.ADMIN,
      emailVerifiedAt: new Date(),
    },
  });
}
