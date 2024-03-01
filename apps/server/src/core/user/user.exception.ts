import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super({
      error: 'User tidak ditemukan.',
      statusCode: 404,
    });
  }
}
