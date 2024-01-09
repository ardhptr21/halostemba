import { JwtPayloadEntity } from '@halostemba/entities';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { plainToClass } from 'class-transformer';
import { UserEntity } from '~/commons/entities/user.entity';
import { UserService } from '~/core/user/user.service';
import { AuthRepository } from './auth.repository';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findUser(loginDto.username);
    if (!user) throw new UnauthorizedException('Invalid credentials.');

    const passwordMatch = await compare(loginDto.password, user.password);

    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials.');

    const payload: JwtPayloadEntity = {
      username: user.username,
      sub: user.id.toString(),
    };

    return {
      user: plainToClass(UserEntity, user),
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const username =
      registerDto.name.split('@')[0].toLowerCase().replace(' ', '_') +
      Math.floor(Math.random() * 1000);

    const hashPassword = await hash(registerDto.password, 10);
    registerDto.password = hashPassword;

    const user = await this.authRepository.registerUser({
      ...registerDto,
      username,
    });
    return new UserEntity(user);
  }
}
