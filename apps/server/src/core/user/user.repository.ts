import { Role, VerificationRequest } from '@halostemba/db';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '~/providers/database/database.service';

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
}
