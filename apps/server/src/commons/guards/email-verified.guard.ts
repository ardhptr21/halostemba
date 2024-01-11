import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

export const EMAIL_VERIFIED_METADATA_KEY = 'emailVerified';
@Injectable()
export class EmailVerifiedGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const mustVerified = this.reflector.getAllAndOverride<boolean>(
      EMAIL_VERIFIED_METADATA_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!mustVerified) return true;

    const request = context.switchToHttp().getRequest() as Request;

    if (!request.user?.emailVerifiedAt) {
      throw new ForbiddenException('Email not verified');
    }

    return true;
  }
}
