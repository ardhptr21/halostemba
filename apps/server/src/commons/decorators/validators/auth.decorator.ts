import { Role } from '@halostemba/db';
import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { JwtAuthGuard } from '~/commons/guards/jwt-auth.guard';
import { ROLES_METADATA_KEY, RolesGuard } from '~/commons/guards/roles.guard';

export const Auth = (...roles: Role[]) =>
  applyDecorators(
    SetMetadata(ROLES_METADATA_KEY, roles),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
