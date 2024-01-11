import { Injectable } from '@nestjs/common';
import { DatabaseService } from '~/providers/database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  async findUser(username: string) {
    return await this.db.user.findFirst({
      where: { OR: [{ username }, { email: username }] },
    });
  }

  async findUserById(id: string) {
    return await this.db.user.findFirst({ where: { id } });
  }
}
