import { Injectable } from '@nestjs/common';
import { DatabaseService } from '~/providers/database/database.service';
import { UpdateProfileDto } from './dtos/update-profile.dto';

@Injectable()
export class ProfileRepository {
  constructor(private readonly db: DatabaseService) {}

  async updateProfile(userId: string, data: UpdateProfileDto) {
    return await this.db.user.update({
      where: { id: userId },
      data,
    });
  }

  async updateEmailVerification(userId: string) {
    return await this.db.user.update({
      where: { id: userId },
      data: { emailVerifiedAt: null },
    });
  }
}
