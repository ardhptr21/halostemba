import { Injectable } from '@nestjs/common';
import { DatabaseService } from '~/providers/database/database.service';
import { addMinutes } from 'date-fns';

@Injectable()
export class MagicLinkRepository {
  constructor(private readonly db: DatabaseService) {}

  async createMagicLinkToken(
    userId: string,
    token: string,
    expiredInMinutes: number = 5,
  ) {
    return await this.db.magicLink.create({
      data: {
        userId,
        token,
        expiredAt: addMinutes(new Date(), expiredInMinutes),
        type: 'EMAIL_VERIFICATION',
      },
    });
  }

  async getMagicLinkByUserId(userId: string) {
    return await this.db.magicLink.findFirst({
      where: {
        userId,
        expiredAt: {
          gte: new Date(),
        },
      },
    });
  }

  async getMagicLink(token: string) {
    return await this.db.magicLink.findFirst({
      where: {
        token,
        type: 'EMAIL_VERIFICATION',
        expiredAt: {
          gte: new Date(),
        },
      },
    });
  }

  async deleteMagicLinkByUserId(userId: string) {
    return await this.db.magicLink.deleteMany({
      where: {
        userId,
      },
    });
  }
}
