import { Injectable } from '@nestjs/common';
import { DatabaseService } from '~/providers/database/database.service';

@Injectable()
export class MajorRepository {
  constructor(private readonly db: DatabaseService) {}

  async listMajors() {
    return await this.db.major.findMany({
      select: { id: true, name: true, logo: true },
    });
  }
}
