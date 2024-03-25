import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

export class MenfessNotFoundException extends NotFoundException {
  constructor() {
    super({
      error: 'Menfess tidak ditemukan.',
      statusCode: 404,
    });
  }
}

export class MenfessServerError extends InternalServerErrorException {
  constructor(error: string) {
    super({
      error: error,
      statusCode: 500,
    });
  }
}
