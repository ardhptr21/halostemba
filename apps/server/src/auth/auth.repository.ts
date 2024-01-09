import { Injectable } from '@nestjs/common';
import { DatabaseService } from '~/providers/database/database.service';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthRepository {
  constructor(private readonly db: DatabaseService) {}

  async registerUser(data: RegisterDto & { username: string }) {
    return await this.db.user.create({ data });
  }
}
