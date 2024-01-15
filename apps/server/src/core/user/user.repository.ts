import { Prisma, Role, VerificationRequest } from '@halostemba/db';
import { Injectable } from '@nestjs/common';
import { paginator } from '~/providers/database/database.paginator';
import { DatabaseService } from '~/providers/database/database.service';
import { GetUserParamsDto } from './dtos/get-user-params.dto';

const paginate = paginator({ perPage: 10 });
@Injectable()
export class UserRepository {
  constructor(private readonly db: DatabaseService) {}

  async updateUserGuestToStudent(
    userId: string,
    verification: VerificationRequest,
  ) {
    const { nis, majorId, idCard } = verification;
    return await this.db.user.update({
      where: { id: userId },
      data: {
        role: Role.STUDENT,
        student: { create: { nis, majorId, idCard } },
      },
    });
  }

  async findUserById(id: string) {
    return await this.db.user.findFirst({ where: { id } });
  }

  async findUser(username: string) {
    return await this.db.user.findFirst({
      where: { OR: [{ username }, { email: username }] },
    });
  }

  async getUsers(params: GetUserParamsDto) {
    return await paginate<any, Prisma.UserFindManyArgs>(
      this.db.user,
      {
        where: {
          name: { contains: params.search || undefined, mode: 'insensitive' },
        },
        orderBy: { [params.sortBy || 'name']: params.order || 'asc' },
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          emailVerifiedAt: true,
          bannedAt: true,
        },
      },
      {
        page: params.page,
        perPage: params.perPage,
      },
    );
  }

  async banUser(id: string) {
    return await this.db.user.update({
      where: { id },
      data: { bannedAt: new Date(), banned: true },
    });
  }

  async unbanUser(id: string) {
    return await this.db.user.update({
      where: { id },
      data: { bannedAt: null, banned: false },
    });
  }
}
