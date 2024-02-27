import { ForbiddenException, Injectable } from '@nestjs/common';
import { GetUserParamsDto } from './dtos/get-user-params.dto';
import { UserNotFoundException } from './user.exception';
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
      throw new UserNotFoundException();
    }

    if (user.id === userId) {
      throw new ForbiddenException({
        error: 'Tidak dapat memblokir akun sendiri.',
        statusCode: 403,
      });
    }

    if (user.banned) {
      await this.userRepository.unbanUser(id);
      return { message: 'Blokir telah dicabut' };
    }

    await this.userRepository.banUser(id);
    return { message: 'User telah diblokir' };
  }
}
