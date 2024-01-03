import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { jwtConstant } from '../auth.constant';
import { JwtPayloadEntity } from '@halostemba/entities';
import { User } from '@halostemba/db';
import { UserService } from '~/core/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstant.secret,
    } satisfies StrategyOptions);
  }

  async validate(payload: JwtPayloadEntity): Promise<Omit<User, 'password'>> {
    const user = await this.userService.findUser(payload.username);

    if (!user) throw new UnauthorizedException();
    const { password: _, ...result } = user;
    return result;
  }
}
