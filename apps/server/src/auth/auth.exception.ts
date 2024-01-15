import { UnauthorizedException } from '@nestjs/common';

export class UserUnAuthorizedException extends UnauthorizedException {
  constructor() {
    super({
      error: 'Data akun yang dimasukkan tidak sesuai.',
      statusCode: 401,
    });
  }
}

export class InvalidTokenException extends UnauthorizedException {
  constructor() {
    super({
      error: 'Token tidak valid.',
      statusCode: 401,
    });
  }
}
