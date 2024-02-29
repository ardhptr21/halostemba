import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { UserEntity } from '~/commons/entities/user.entity';
import { CreateUserDTO } from './dtos/create-user.dto';
import { GetUserParamsDto } from './dtos/get-user-params.dto';
import { UserNotFoundException } from './user.exception';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: Logger,
  ) {}

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

  async createUser(createUserDto: CreateUserDTO) {
    const username =
      createUserDto.name.toLowerCase().split(' ').slice(0, 2).join('_') +
      Math.floor(Math.random() * 1000);

    const hashPassword = await hash(createUserDto.password, 10);
    createUserDto.password = hashPassword;

    const user = await this.userRepository.createUserByAdmin({
      ...createUserDto,
      username,
    });

    this.logger.log(`User ${user.id}-${user.email} has been created.`);

    return new UserEntity(user);
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

      this.logger.log(`User ${user.id}-${user.email} has been unbanned.`);

      return { message: 'Blokir telah dicabut' };
    }

    await this.userRepository.banUser(id);

    this.logger.log(`User ${user.id}-${user.email} has been banned.`);

    return { message: 'User telah diblokir' };
  }
}
