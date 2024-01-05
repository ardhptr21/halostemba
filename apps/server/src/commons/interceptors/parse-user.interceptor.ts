import { JwtPayloadEntity } from '@halostemba/entities';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExtractJwt } from 'passport-jwt';
import { Observable } from 'rxjs';
import { DatabaseService } from '~/providers/database/database.service';

@Injectable()
export class ParseUserInterceptor implements NestInterceptor {
  constructor(
    private readonly jwtService: JwtService,
    private readonly db: DatabaseService,
  ) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

    if (!token) return next.handle();

    try {
      const { username } = this.jwtService.verify(token) as JwtPayloadEntity;
      const user = await this.db.user.findFirst({
        where: { OR: [{ username }, { email: username }] },
      });
      request.user = user;
    } catch {}
    return next.handle();
  }
}
