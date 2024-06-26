import { UserEntity } from '@halostemba/entities';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Put,
} from '@nestjs/common';
import { User } from '~/commons/decorators/requests/user.decorator';
import { Auth } from '~/commons/decorators/validators/auth.decorator';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { ProfileService } from './profile.service';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { ChangeProfilePictureDto } from './dtos/change-profile-picture.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Auth(false)
  @HttpCode(HttpStatus.OK)
  @Get('/me')
  async getProfile(@User() user: UserEntity) {
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:username')
  async getProfileByUsername(@Param('username') username: string) {
    return this.profileService.getProfile(username);
  }

  @Auth(false)
  @HttpCode(HttpStatus.OK)
  @Put('/me')
  async updateProfile(
    @Body() updateProfileDto: UpdateProfileDto,
    @User() user: UserEntity,
  ) {
    return this.profileService.updateProfile(user.id, updateProfileDto);
  }

  @Auth(false)
  @HttpCode(HttpStatus.OK)
  @Patch('/change-password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @User() user: UserEntity,
  ) {
    return this.profileService.changePassword(
      user.id,
      changePasswordDto.password,
    );
  }

  @Auth(false)
  @HttpCode(HttpStatus.OK)
  @Patch('/change-avatar')
  async changeAvatar(
    @Body() changeProfilePictureDto: ChangeProfilePictureDto,
    @User() user: UserEntity,
  ) {
    return this.profileService.changeAvatar(
      user.id,
      changeProfilePictureDto.avatar,
    );
  }
}
