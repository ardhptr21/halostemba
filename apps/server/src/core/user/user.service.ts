import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GetUserParamsDto } from './dtos/get-user-params.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUser(username: string) {
    return await this.userRepository.findUser(username);
  }

  async findUserById(id: string) {
    return await this.userRepository.findUserById(id);
  }

  async getUsers(params: GetUserParamsDto) {
    const user = await this.userRepository.getUsers(params);

    return user;
  }

  async banOrUnbanUser(id: string, userId: string) {
    const user = await this.userRepository.findUserById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.id === userId) {
      throw new ForbiddenException('You cannot ban yourself');
    }

    if (user.banned) {
      await this.userRepository.unbanUser(id);
      return { message: 'User has been unbanned' };
    }

    await this.userRepository.banUser(id);
    return { message: 'User has been banned' };
  }
}
