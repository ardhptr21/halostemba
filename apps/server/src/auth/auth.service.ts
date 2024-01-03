import { Injectable } from '@nestjs/common';
import { DatabaseService } from '~/providers/database/database.service';

@Injectable()
export class AuthService {
  constructor(private readonly db: DatabaseService) {}

  async login() {}

  async register() {}
}
