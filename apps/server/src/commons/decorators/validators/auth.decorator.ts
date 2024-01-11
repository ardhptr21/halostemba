import { Role } from '@halostemba/db';
import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import {
  EMAIL_VERIFIED_METADATA_KEY,
  EmailVerifiedGuard,
} from '~/commons/guards/email-verified.guard';
import { JwtAuthGuard } from '~/commons/guards/jwt-auth.guard';
import { ROLES_METADATA_KEY, RolesGuard } from '~/commons/guards/roles.guard';

export const Auth = (emailMustVerified: boolean, ...roles: Role[]) =>
  applyDecorators(
    SetMetadata(EMAIL_VERIFIED_METADATA_KEY, emailMustVerified),
    SetMetadata(ROLES_METADATA_KEY, roles),
    UseGuards(JwtAuthGuard, EmailVerifiedGuard, RolesGuard),
  );
