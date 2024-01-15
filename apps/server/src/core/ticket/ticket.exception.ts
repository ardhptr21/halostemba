import { NotFoundException } from '@nestjs/common';

export class TicketNotFoundException extends NotFoundException {
  constructor() {
    super({
      error: 'Laporan tidak ditemukan.',
      statusCode: 404,
    });
  }
}

export class TicketServerError extends NotFoundException {
  constructor(error: string) {
    super({
      error: error,
      statusCode: 500,
    });
  }
}
