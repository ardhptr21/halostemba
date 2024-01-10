import { Injectable } from '@nestjs/common';
import { DatabaseService } from '~/providers/database/database.service';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthRepository {
  constructor(private readonly db: DatabaseService) {}

  async registerUser(data: RegisterDto & { username: string }) {
    return await this.db.user.create({ data });
  }

  async verifyEmail(userId: string) {
    return await this.db.user.update({
      where: {
        id: userId,
      },
      data: {
        emailVerifiedAt: new Date(),
      },
    });
  }

  async resetPassword(userId: string, password: string) {
    return await this.db.user.update({
      where: {
        id: userId,
      },
      data: {
        password,
      },
    });
  }
}
