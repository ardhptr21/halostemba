import { PrismaClient, Role } from "@prisma/client";
import { faker } from "@faker-js/faker";

export default async function UserSeeder(client: PrismaClient) {
  const users = [
    {
      name: faker.person.fullName(),
      username: "admin",
      password: "$2a$10$dmbv7vTzPR3Z4lGWgRueB.T7CJwDsxDqLoMliGH.1h5a6V2rZrUL6", //rahasia123
      email: faker.internet.email(),
      role: Role.ADMIN,
      emailVerifiedAt: new Date(),
    },
    {
      name: faker.person.fullName(),
      username: "student",
      password: "$2a$10$dmbv7vTzPR3Z4lGWgRueB.T7CJwDsxDqLoMliGH.1h5a6V2rZrUL6", //rahasia123
      email: faker.internet.email(),
      role: Role.STUDENT,
      emailVerifiedAt: new Date(),
    },
    {
      name: faker.person.fullName(),
      username: "teacher",
      password: "$2a$10$dmbv7vTzPR3Z4lGWgRueB.T7CJwDsxDqLoMliGH.1h5a6V2rZrUL6", //rahasia123
      email: faker.internet.email(),
      role: Role.TEACHER,
      emailVerifiedAt: new Date(),
    },
    {
      name: faker.person.fullName(),
      username: "guest",
      password: "rahasia123",
      email: faker.internet.email(),
      role: Role.GUEST,
      emailVerifiedAt: new Date(),
    },
  ];

  return await client.user.createMany({
    data: users,
  });
}
