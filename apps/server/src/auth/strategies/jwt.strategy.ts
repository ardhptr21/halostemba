import { JwtPayloadEntity } from '@halostemba/entities';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { jwtConstant } from '../auth.constant';
import { plainToClass } from 'class-transformer';
import { UserEntity } from '~/commons/entities/user.entity';
import { UserRepository } from '~/core/user/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstant.secret,
    } satisfies StrategyOptions);
  }

  async validate(
    payload: JwtPayloadEntity,
  ): Promise<Omit<UserEntity, 'password'>> {
    const user = await this.userRepository.findUserById(payload.sub);

    if (!user) throw new UnauthorizedException();
    return plainToClass(UserEntity, user);
  }
}
