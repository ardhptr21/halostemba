import { BadRequestException, Injectable } from '@nestjs/common';
import { ProfileRepository } from './profile.repository';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { UserService } from '../user/user.service';
import { compare, hash } from 'bcryptjs';
import { MailService } from '~/mail/mail.service';

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    const user = await this.userService.findUserById(userId);

    await this.profileRepository.updateProfile(userId, updateProfileDto);

    if (updateProfileDto.email && updateProfileDto.email !== user.email) {
      await this.profileRepository.updateEmailVerification(userId);
    }

    return {
      message: 'Profile updated',
    };
  }

  async changePassword(userId: string, password: string) {
    const user = await this.userService.findUserById(userId);

    const hashPassword = await hash(password, 10);

    const passwordMatch = await compare(password, user.password);

    if (passwordMatch)
      throw new BadRequestException(
        'Password cannot be the same as the old password',
      );

    await this.profileRepository.changePassword(user.id, hashPassword);

    await this.mailService.sendResetPasswordSuccess(user);

    return {
      message: 'Password changed',
    };
  }
}
