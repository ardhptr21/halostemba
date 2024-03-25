import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { addMinutes } from 'date-fns';

@Injectable()
export class OtpRepository {
  constructor(private readonly db: DatabaseService) {}

  async createOtpToken(
    userId: string,
    token: string,
    expiredInMinutes: number = 5,
  ) {
    return await this.db.oTP.create({
      data: {
        userId,
        value: token,
        type: 'FORGOT_PASSWORD',
        expiredAt: addMinutes(new Date(), expiredInMinutes),
      },
    });
  }

  async getOtpById(id: string) {
    return await this.db.oTP.findFirst({
      where: {
        id,
      },
    });
  }

  async getOtpByUserId(userId: string) {
    return await this.db.oTP.findFirst({
      where: {
        userId,
        expiredAt: {
          gte: new Date(),
        },
      },
    });
  }

  async getOtp(token: string, userId: string) {
    return await this.db.oTP.findFirst({
      where: {
        value: token,
        type: 'FORGOT_PASSWORD',
        userId,
        expiredAt: {
          gte: new Date(),
        },
      },
    });
  }

  async deleteOtpByUserId(userId: string) {
    return await this.db.oTP.deleteMany({
      where: {
        userId,
      },
    });
  }
}
