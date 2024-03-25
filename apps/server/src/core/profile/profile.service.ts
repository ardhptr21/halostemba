import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { plainToClass } from 'class-transformer';
import { UserEntity } from '~/commons/entities/user.entity';
import { MailService } from '~/mail/mail.service';
import { UserRepository } from '../user/user.repository';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly userRepository: UserRepository,
    private readonly mailService: MailService,
    private readonly logger: Logger,
  ) {}

  async getProfile(username: string) {
    const profile = await this.userRepository.findUser(username);

    if (!profile)
      throw new NotFoundException({
        error: 'Profile tidak ditemukan.',
        statusCode: 404,
      });

    return {
      message: 'Profile berhasil didapatkan.',
      data: plainToClass(UserEntity, profile),
    };
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    const user = await this.userRepository.findUserById(userId);

    await this.profileRepository.updateProfile(userId, updateProfileDto);

    if (updateProfileDto.email && updateProfileDto.email !== user.email) {
      await this.profileRepository.updateEmailVerification(userId);
      this.logger.log(`User ${user.id} has updated their email.`);
    }

    return {
      message: 'Profile telah diperbarui.',
    };
  }

  async changePassword(userId: string, password: string) {
    const user = await this.userRepository.findUserById(userId);

    const hashPassword = await hash(password, 10);

    const passwordMatch = await compare(password, user.password);

    if (passwordMatch)
      throw new BadRequestException({
        error: 'Password tidak boleh sama dengan password lama.',
        statusCode: 400,
      });

    await this.profileRepository.changePassword(user.id, hashPassword);
    await this.mailService.sendResetPasswordSuccess(user);

    this.logger.log(
      `User ${user.id}-${user.email} has changed their password.`,
    );

    return {
      message: 'Password telah diubah.',
    };
  }

  async changeAvatar(userId: string, avatar: string) {
    await this.profileRepository.changeProfilePicture(userId, avatar);

    return {
      message: 'Avatar telah diubah.',
    };
  }
}
