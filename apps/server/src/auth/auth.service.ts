import { JwtPayloadEntity } from '@halostemba/entities';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { plainToClass } from 'class-transformer';
import { UserEntity } from '~/commons/entities/user.entity';
import { UserService } from '~/core/user/user.service';
import { AuthRepository } from './auth.repository';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { MailService } from '~/mail/mail.service';
import { UserEntity as UserEntityLib } from '@halostemba/entities';
import { MagicLinkRepository } from '~/providers/magiclink/magiclink.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly magicLinkRepository: MagicLinkRepository,
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

  async requestVerifyEmail(user: UserEntityLib) {
    if (user.emailVerifiedAt)
      throw new BadRequestException('Email has already verified.');

    await this.mailService.sendEmailVerification(user);

    return {
      message: 'Email has already sent. Please check your email.',
    };
  }

  async verifyEmail(token: string, user: UserEntityLib) {
    const magicLink = await this.magicLinkRepository.getMagicLink(
      token,
      user.id,
    );

    if (!magicLink) throw new UnauthorizedException('Invalid token.');

    await this.authRepository.verifyEmail(user.id);

    await this.magicLinkRepository.deleteMagicLinkByUserId(user.id);

    return {
      message: 'Email has been verified.',
    };
  }
}
