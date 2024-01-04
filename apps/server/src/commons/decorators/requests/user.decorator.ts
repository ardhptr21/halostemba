import { UserEntity } from '@halostemba/entities';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const User = createParamDecorator(
  (_, context: ExecutionContext): UserEntity => {
    const request = context.switchToHttp().getRequest() as Request;

    return request.user;
  },
);
