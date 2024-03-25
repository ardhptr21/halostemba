import { Prisma, Role, VerificationStatus } from '@halostemba/db';
import { Injectable } from '@nestjs/common';
import { paginator } from '~/providers/database/database.paginator';
import { DatabaseService } from '~/providers/database/database.service';
import { CreateVerificationDto } from './dtos/create-verification.dto';
import { ListVerificationParamsDto } from './dtos/list-verification-params.dto';

const paginate = paginator({ perPage: 10 });

@Injectable()
export class VerificationRepository {
  constructor(private readonly db: DatabaseService) {}

  async getVerifications(params: ListVerificationParamsDto) {
    return await paginate<any, Prisma.VerificationRequestFindManyArgs>(
      this.db.verificationRequest,
      {
        where: { status: VerificationStatus.PENDING },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          nis: true,
          idCard: true,
          createdAt: true,
          user: { select: { id: true, name: true, email: true, avatar: true } },
          major: { select: { name: true } },
        },
      },
      params,
    );
  }

  async getVerificationByUserId(userId: string) {
    return await this.db.verificationRequest.findFirst({
      where: { userId },
      select: { status: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createVerification(
    data: CreateVerificationDto & {
      userId: string;
    },
  ) {
    return await this.db.verificationRequest.create({
      data: {
        idCard: data.idCard,
        nis: data.nis,
        user: { connect: { id: data.userId } },
        major: { connect: { id: data.majorId } },
      },
    });
  }

  async getListVerificationByUserId(userId: string) {
    return await this.db.verificationRequest.findMany({
      where: { userId },
      include: { major: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getVerificationByUserIdAndRole(userId: string, role: Role) {
    return await this.db.verificationRequest.findFirst({
      where: { user: { id: userId, role } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatusVerification(
    verificationId: string,
    status: VerificationStatus,
    note?: string,
  ) {
    return await this.db.verificationRequest.update({
      where: { id: verificationId },
      data: { status, note },
    });
  }
}
