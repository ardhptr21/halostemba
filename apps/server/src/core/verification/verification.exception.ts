import { BadRequestException, NotFoundException } from '@nestjs/common';

export class VerificationBadRequestException extends BadRequestException {
  constructor(error: string) {
    super({
      error: error,
      statusCode: 400,
    });
  }
}

export class VerificationNotFoundException extends NotFoundException {
  constructor() {
    super({
      error: 'Verifikasi tidak ditemukan.',
      statusCode: 404,
    });
  }
}
