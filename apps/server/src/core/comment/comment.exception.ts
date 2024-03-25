import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

export class CommentNotFoundException extends NotFoundException {
  constructor() {
    super({
      error: 'Komentar tidak ditemukan.',
      statusCode: 404,
    });
  }
}

export class CommentServerError extends InternalServerErrorException {
  constructor(error: string) {
    super({
      error: error,
      statusCode: 500,
    });
  }
}
